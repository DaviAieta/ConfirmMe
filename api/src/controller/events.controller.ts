import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

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
            console.log(event)
            const createdEvent = await prisma.events.create({
                data: {
                    title: event.title,
                    description: event.description,
                    dhStart: new Date(event.dhStart + 'z'),
                    dhEnd: new Date(event.dhEnd + 'z'),
                    address: event.address,
                    peopleLimit: parseInt(event.people_limit, 10),
                    status: event.status,
                    categoryId: event.category,
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
}