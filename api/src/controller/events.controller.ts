import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { Notifications } from "../services/notificationService";
import { Validator } from "../validators/validator";

export class EventsController {
  static async list(req: Request, res: Response) {
    try {
      const events = await prisma.events.findMany({});

      return res.send(events);
    } catch {
      return res.status(400).json("An unexpected error occurred.");
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const event = req.body;

      const validationResult = Validator.dataEvent(event);

      if (!validationResult.success) {
        const errorMessages = validationResult.error.errors
          .map((err: any) => err.message)
          .join(", ");

        return res.status(400).json(errorMessages);
      }

      const overlappingEvent = await prisma.events.findFirst({
        where: {
          zipCode: event.zipCode,
          address: event.address,
          dhStart: {
            lt: new Date(event.dhEnd + "Z"),
          },
          dhEnd: {
            gt: new Date(event.dhStart + "Z"),
          },
        },
      });

      if (overlappingEvent) {
        return res
          .status(400)
          .json("An event already exists at this location and time.");
      }

      const createdEvent = await prisma.events.create({
        data: {
          title: event.title,
          description: event.description,
          dhStart: new Date(event.dhStart + "z"),
          dhEnd: new Date(event.dhEnd + "z"),
          zipCode: event.zipCode,
          address: event.address,
          link: event.link,
          peopleLimit: parseInt(event.people_limit, 10),
          status: event.status,
          imagePath: event.imagePath,
          categoriesId: event.categoriesId,
          type: event.type,
        },
      });

      return res.send(createdEvent);
    } catch {
      return res.status(400).json("An unexpected error occurred.");
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { uuid } = req.body;

      const event = await prisma.events.findUnique({
        where: { uuid },
      });

      if (!event) {
        return res.status(400).json("Event Not Found");
      }

      const isUpcoming = new Date(event.dhStart) > new Date();

      const eventGuests = await prisma.eventGuest.findMany({
        where: { eventId: event.id },
        include: { guest: true },
      });

      const guests = eventGuests.map((eventGuest) => eventGuest.guest);

      if (guests.length > 0) {
        await prisma.eventGuest.deleteMany({
          where: {
            eventId: event.id,
          },
        });
      }

      if (isUpcoming && guests.length > 0) {
        const validGuests = guests
          .filter((guest) => guest.email !== null)
          .map((guest) => ({
            email: guest.email as string,
            name: guest.name,
          }));

        await Notifications.eventCancellation(
          validGuests,
          event.title,
          event.dhStart
        );
      }

      const deletedEvent = await prisma.events.delete({
        where: event,
      });

      return res.send(deletedEvent);
    } catch (error) {
      console.log(error);
      return res.status(400).json("An unexpected error occurred.");
    }
  }

  static async findOne(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const event = await prisma.events.findUnique({
        where: { uuid },
      });
      if (!event) {
        return res.status(404).json("Event Not Found");
      }

      return res.send(event);
    } catch {
      return res.status(400).json("An unexpected error occurred.");
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const event = req.body;

      const updatedEvent = await prisma.events.update({
        where: {
          uuid: event.uuid,
        },
        data: {
          categoriesId: event.category,
          title: event.title,
          description: event.description,
          dhStart: new Date(event.dhStart + "z"),
          dhEnd: new Date(event.dhEnd + "z"),
          zipCode: event.zipCode,
          address: event.address,
          link: event.link,
          peopleLimit: parseInt(event.people_limit, 10),
          type: event.type,
        },
      });

      return res.send(updatedEvent);
    } catch (error) {
      return res.status(400).json("An unexpected error occurred.");
    }
  }
}
