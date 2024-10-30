import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export class PeopleController {
    static async list(req: Request, res: Response) {
        try {
            const people = await prisma.people.findMany({})
            if (!people) {
                return res.status(404).json('Not found')
            }
            return res.send(people)
        } catch (error) {
            return res.status(400).json(error)
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const person = req.body
            console.log('passou')
            console.log(person)
            const createdPerson = await prisma.people.create({
                data: person
            })

            return res.send(createdPerson)
        } catch (error) {
            return res.status(400).json({ error })
        }
    }
}