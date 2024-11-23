import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import crypto from "crypto"
import twilio from "twilio"

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
            const { name, phone, uuid } = req.body
            const event = await prisma.events.findUnique({
                where: { uuid }
            })

            if (!event) {
                return res.status(404).json("Event not found");
            }

            const cleanedPhone = phone.replace(/[()\-\s]/g, '')

            const createdPreRegister = await prisma.guests.create({
                data: {
                    name: name,
                    phone: cleanedPhone,
                    eventId: event?.id
                }
            })
            return res.send(createdPreRegister)
        } catch (error) {
            return res.status(400).json({ error })
        }
    }

    static async sendCode(req: Request, res: Response) {
        try {
            const { phone } = req.body
            const cleanedPhone = phone.replace(/[()\-\s]/g, '')

            // verificar se o numero realmente existe
            const guest = await prisma.guests.findFirst({
                where: { phone: cleanedPhone }
            })

            if (!guest) {
                return res.status(404).json("Guest not found");

            }

            // gerar um codigo e registrar ele no banco de dados
            const verificationCode = crypto.randomInt(100000, 999999).toString();

            const createdVerificationCode = await prisma.guests.update({
                where: { phone: cleanedPhone },
                data: {
                    verificationCode,
                },
            })

            // mandar um sms para o usuario com o codigo tal

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
}