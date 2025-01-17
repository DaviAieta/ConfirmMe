import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { Notifications } from "../services/notificationService";
import { Validator } from "../validators/validator";

export class EventsController {
  static async list(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json("Authorization header is required.");
      }
      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).json("Token is missing.");
      }

      const user = await prisma.users.findUnique({
        where: { token },
      });

      if (!user) {
        return res.status(404).json("User not found.");
      }

      const events = await prisma.events.findMany({
        where: { usersId: user.id },
      });

      return res.send(events);
    } catch {
      return res.status(400).json("An unexpected error occurred.");
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const event = req.body;

      const user = await prisma.users.findUnique({
        where: { token: event.userId },
      });

      if (!user) {
        return res.status(404).json("User not found.");
      }

      const validationResult = Validator.dataEvent(event);

      if (!validationResult.success) {
        const errorMessages = validationResult.error.errors
          .map((err: any) => err.message)
          .join(", ");

        return res.status(400).json(errorMessages);
      }

      const dhStart = new Date(event.dhStart + "Z");
      const dhEnd = new Date(event.dhEnd + "Z");

      const overlappingEvent = await prisma.events.findFirst({
        where: {
          zipCode: event.zipCode,
          address: event.address,
          AND: [{ dhStart: { lt: dhEnd } }, { dhEnd: { gt: dhStart } }],
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
          usersId: user.id,
        },
      });

      return res.send(createdEvent);
    } catch {
      return res.status(400).json("An unexpected error occurred.");
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { uuid, userId } = req.body;

      const user = await prisma.users.findUnique({
        where: { token: userId },
      });

      if (!user) {
        return res.status(404).json("User not found.");
      }

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
      return res.status(400).json("An unexpected error occurred.");
    }
  }

  static async findOne(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const authHeader = req.headers.authorization;
      console.log(authHeader);

      if (!authHeader) {
        return res.status(401).json("Authorization header is required.");
      }

      const token = authHeader.split(" ")[1];
      console.log(token);
      if (!token) {
        return res.status(401).json("Token is missing.");
      }

      const user = await prisma.users.findUnique({
        where: { token },
      });

      if (!user) {
        return res.status(404).json("User not found.");
      }

      const event = await prisma.events.findUnique({
        where: { uuid },
      });

      if (!event) {
        return res.status(404).json("Event Not Found");
      }

      if (!event || event.usersId !== user.id) {
        return res
          .status(403)
          .json("You are not authorized to view this category.");
      }

      return res.send(event);
    } catch {
      return res.status(400).json("An unexpected error occurred.");
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const event = req.body;

      const user = await prisma.users.findUnique({
        where: { token: event.userId },
      });

      if (!user) {
        return res.status(404).json("User not found.");
      }

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
