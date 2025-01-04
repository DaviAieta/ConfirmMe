import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import crypto from "crypto"
import { sendMail } from '../services/verificationService'

export class GuestsController {
    static async list(req: Request, res: Response) {
        try {
            const { uuid } = req.params

            const event = await prisma.events.findUnique({
                where: { uuid }
            })

            if (!event) {
                return res.status(404).json("Event not found");
            }

            const guests = await prisma.guests.findMany({
                where: { eventId: event.id }
            });

            if (!guests || guests.length === 0) {
                return res.status(404).json("No guests found for this event");
            }

            return res.send(guests)
        } catch {

        }
    }

    static async preRegister(req: Request, res: Response) {
        try {
            const { name, email, uuid } = req.body
            const event = await prisma.events.findUnique({
                where: { uuid }
            })

            if (!event) {
                return res.status(404).json("Event not found");
            }

            const existingGuest = await prisma.guests.findUnique({
                where: { email }
            })

            if (existingGuest) {
                return res.status(400).json("Guest with this email already exists")
            }

            const createdPreRegister = await prisma.guests.create({
                data: {
                    name: name,
                    email: email,
                    eventId: event?.id
                }
            })

            const link = "http://localhost:3000/events/confirm/" + uuid
            sendMail(
                String(email),
                "Confirm your attendance " + name + "! 🎉",
                "Click this Link: " + link + "✔️",
            )

            return res.send(createdPreRegister)
        } catch (error) {
            return res.status(400).json({ error })
        }
    }

    static async sendCode(req: Request, res: Response) {
        try {
            const { email } = req.body

            const guest = await prisma.guests.findFirst({
                where: { email: email }
            })

            if (!guest) {
                return res.status(404).json("Guest not found");

            }

            const verificationCode = crypto.randomInt(100000, 999999).toString();

            const createdVerificationCode = await prisma.guests.update({
                where: { email: email },
                data: {
                    verificationCode,
                },
            })

            sendMail(
                String(guest.email),
                "Confirm your attendance! 🎉",
                "Your code: " + verificationCode + " ✔️",
            )

            return res.send(createdVerificationCode)
        } catch (error) {
            res.status(500).json({ error: "Error to send the code" });
        }
    }

    static async verifyCode(req: Request, res: Response) {
        try {
            const { code } = req.body

            // Comparar o codigo com o codigo do banco de dados
            const guest = await prisma.guests.findFirst({
                where: { verificationCode: code }
            })

            if (code != guest?.verificationCode) {
                return res.status(400).json({ error: "Invalid Code" })
            }

            return res.send(guest)
        } catch (error) {
            return res.status(400).json({ error })
        }
    }

    static async confirmGuest(req: Request, res: Response) {
        try {
            const { email, phone, eventUuid } = req.body
            console.log(email, eventUuid)

            if (!email || !eventUuid) {
                return res.status(400).json({ error: "Email and event UUID are required." })
            }

            const event = await prisma.events.findUnique({
                where: { uuid: eventUuid },
            })

            if (!event) {
                return res.status(404).json({ error: "Event not found." });
            }

            const existingGuest = await prisma.guests.findFirst({
                where: { email, eventId: event.id },
            })

            if (!existingGuest) {
                return res.status(404).json({ error: "Guest not registered for this event." });
            }

            await prisma.guests.update({
                where: { id: existingGuest.id },
                data: {
                    confirmed: true,
                    declined: false,
                    phone: phone || existingGuest.phone,
                },
            })

            const updatedEvent = await prisma.events.update({
                where: { id: event.id },
                data: {
                    confirmed: event.confirmed + 1,
                },
            })

            return res.send(updatedEvent)

        } catch (error) {
            return res.status(400).json(error)
        }
    }
}