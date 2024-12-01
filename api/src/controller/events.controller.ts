import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import { sendMail } from '../services/verificationService'

export class EventsController {
    static async list(req: Request, res: Response) {
        try {
            const events = await prisma.events.findMany({})
            if (!events) {
                return res.status(404).json('Not found')
            }
            return res.send(events)
        } catch (error) {
            return res.status(400).json(error)
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const event = req.body
            const createdEvent = await prisma.events.create({
                data: {
                    title: event.title,
                    description: event.description,
                    dhStart: new Date(event.dhStart + 'z'),
                    dhEnd: new Date(event.dhEnd + 'z'),
                    address: event.address,
                    peopleLimit: parseInt(event.people_limit, 10),
                    status: event.status,
                    imagePath: event.imagePath
                }
            })
            return res.send(createdEvent)
        } catch (error) {
            return res.status(400).json({ error })
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { uuid } = req.body

            const event = await prisma.events.findUnique({
                where: { uuid }
            })

            if (!event) {
                return res.status(404).json({ error: "Event not found" })
            }

            const isUpcoming = new Date(event.dhStart) > new Date()

            const guests = await prisma.guests.findMany({
                where: { eventId: event.id }
            })

            if (isUpcoming && guests.length > 0) {
                // Enviar e-mails para os convidados informando o cancelamento
                for (const guest of guests) {
                    sendMail(
                        String(guest.email),
                        `Event Cancelled: ${event.title}`,
                        `Hello ${guest.name},\n\nThe event "${event.title}" has been cancelled.\n\nWe apologize for the inconvenience.\n\nBest regards,\nThe ConfirmMe Team`

                    )
                }
            }

            const deletedEvent = await prisma.events.delete({
                where: event
            })

            return res.send(deletedEvent)
        } catch (error) {
            return res.status(400).json({ error })
        }
    }

    static async findOne(req: Request, res: Response) {
        try {
            const { uuid } = req.params
            const event = await prisma.events.findUnique({
                where: { uuid }
            })

            if (!event) {
                return res.status(404).json('event not found')
            }

            return res.send(event)
        } catch (error) {
            return res.status(400).json('Error')
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const event = req.body

            const updatedEvent = await prisma.events.update({
                where: {
                    uuid: event.uuid
                },
                data: {
                    title: event.title,
                    description: event.description,
                    dhStart: new Date(event.dhStart + 'z'),
                    dhEnd: new Date(event.dhEnd + 'z'),
                    address: event.address,
                    peopleLimit: parseInt(event.people_limit, 10),
                    status: event.status,
                    imagePath: event.imagePath
                }
            })

            console.log(updatedEvent)
            return res.send(updatedEvent)

        } catch (error) {
            return res.status(400).json({ error })
        }
    }
}