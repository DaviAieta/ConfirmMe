import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

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

    static async create(req: Request, res: Response) {
        try {
            const guest = req.body
            console.log(console.log)

            // add guest on the tabel
            // add + 1 confirm on the event table

        } catch (error) {
            return res.status(400).json({ error })
        }
    }

    static async sendCode(req: Request, res: Response) {
        try {
            const { phone } = req.body

            // gerar um codigo e registrar ele no banco de dados
            // mandar um sms para o usuario com o codigo tal

            return res.send(phone)
        } catch (error) {
            res.status(500).json({ error: "Error to send the code" });
        }
    }
}