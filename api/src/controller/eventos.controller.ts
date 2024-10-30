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
                data: event
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
}