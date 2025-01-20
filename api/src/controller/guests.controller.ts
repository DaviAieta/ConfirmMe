import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import crypto from "crypto";
import { Notifications } from "../services/notificationService";

export class GuestsController {
  static async list(req: Request, res: Response) {
    try {
      const { uuid } = req.params;

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

      const event = await prisma.events.findUnique({
        where: { uuid },
      });

      if (!event) {
        return res.status(400).json("Event not found");
      }

      if (event.confirmed >= event.peopleLimit) {
        return res.status(400).json("Guest limit exceeded");
      }

      const guests = await prisma.eventGuest.findMany({
        where: {
          eventId: event.id,
        },
        include: {
          guest: true,
        },
      });

      return res.send(guests);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  static async bulkPreRegister(req: Request, res: Response) {
    try {
      const { uuid, guests, userId } = req.body;

      const user = await prisma.users.findUnique({
        where: { token: userId },
      });

      if (!user) {
        return res.status(404).json("User not found.");
      }

      if (!guests || guests.length === 0) {
        return res.status(400).json("No guests data found.");
      }

      const event = await prisma.events.findUnique({
        where: { uuid },
      });

      if (!event) {
        return res.status(400).json("Event not found.");
      }

      if (guests.length > event.peopleLimit) {
        return res
          .status(400)
          .json(
            `Guest limit exceeded. Maximum allowed is ${event.peopleLimit} guests.`
          );
      }

      const createdGuests = await Promise.all(
        guests.map(async (guest: any) => {
          let newGuest = await prisma.guests.upsert({
            where: { email: guest.email },
            update: {},
            create: {
              name: guest.name,
              email: guest.email,
            },
          });

          await prisma.eventGuest.create({
            data: {
              eventId: event.id,
              guestId: newGuest.id,
              confirmed: false,
              declined: false,
            },
          });

          return newGuest;
        })
      );

      res.send(createdGuests);
    } catch (error) {
      return res.status(400).json("An unexpected error occurred.");
    }
  }

  static async preRegister(req: Request, res: Response) {
    try {
      const { name, email, uuid, userId } = req.body;

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
        return res.status(400).json("Event not found");
      }

      if (event.confirmed >= event.peopleLimit) {
        return res.status(400).json("Guest limit exceeded");
      }

      let guest = await prisma.guests.findUnique({
        where: { email },
      });

      if (!guest) {
        guest = await prisma.guests.create({
          data: {
            name,
            email,
          },
        });
      }

      const existingRelation = await prisma.eventGuest.findUnique({
        where: {
          eventId_guestId: {
            eventId: event.id,
            guestId: guest.id,
          },
        },
      });

      if (existingRelation) {
        return res.status(400).json("Guest already registered for this event");
      }

      const createdGuest = await prisma.eventGuest.create({
        data: {
          eventId: event.id,
          guestId: guest.id,
          confirmed: false,
        },
      });

      const link = "http://localhost:3000/events/confirm/" + uuid;
      await Notifications.preRegisterGuest(
        name,
        email,
        event.title,
        link,
        event.dhStart
      );

      return res.send(createdGuest);
    } catch (error) {
      return res.status(400).json("An unexpected error occurred.");
    }
  }

  static async sendCode(req: Request, res: Response) {
    try {
      const { email, eventUuid } = req.body;

      const event = await prisma.events.findUnique({
        where: { uuid: eventUuid },
      });

      if (!event) {
        return res.status(400).json("Event not found.");
      }

      const guest = await prisma.guests.findFirst({
        where: { email: email },
      });

      if (!guest) {
        return res.status(400).json("Email Not Found");
      }

      const eventGuest = await prisma.eventGuest.findUnique({
        where: {
          eventId_guestId: {
            eventId: event.id,
            guestId: guest.id,
          },
        },
      });

      if (!eventGuest) {
        return res.status(400).json("Guest not registered for this event.");
      }

      const verificationCode = crypto.randomInt(10000, 99999).toString();

      const createdVerificationCode = await prisma.guests.update({
        where: { email: email },
        data: {
          verificationCode,
        },
      });

      await Notifications.sendCode(guest.name, email, verificationCode);

      return res.send(createdVerificationCode);
    } catch (error) {
      return res.status(400).json("An unexpected error occurred.");
    }
  }

  static async verifyCode(req: Request, res: Response) {
    try {
      const { code } = req.body;

      const guest = await prisma.guests.findFirst({
        where: { verificationCode: code },
      });

      if (!guest) {
        return res.status(400).json("Invalid Code");
      }

      if (code != guest?.verificationCode) {
        return res.status(400).json("Invalid Code");
      }

      return res.send(guest);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  static async confirmGuest(req: Request, res: Response) {
    try {
      const { email, phone, eventUuid } = req.body;

      if (!email || !eventUuid) {
        return res.status(400).json("Email and event UUID are required.");
      }

      const event = await prisma.events.findUnique({
        where: { uuid: eventUuid },
      });

      if (!event) {
        return res.status(400).json("Event not found.");
      }

      if (event.confirmed >= event.peopleLimit) {
        return res.status(400).json("Guest limit exceeded");
      }

      const guest = await prisma.guests.findUnique({
        where: { email },
      });

      if (!guest) {
        return res.status(404).json("Guest not found.");
      }

      const eventGuest = await prisma.eventGuest.findUnique({
        where: {
          eventId_guestId: {
            eventId: event.id,
            guestId: guest.id,
          },
        },
      });

      if (!eventGuest) {
        return res.status(404).json("Guest not registered for this event.");
      }

      await prisma.eventGuest.update({
        where: {
          eventId_guestId: {
            eventId: event.id,
            guestId: guest.id,
          },
        },
        data: {
          confirmed: true,
          declined: false,
        },
      });

      const updatedEvent = await prisma.events.update({
        where: { id: event.id },
        data: {
          confirmed: event.confirmed + 1,
        },
      });

      return res.send(updatedEvent);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
