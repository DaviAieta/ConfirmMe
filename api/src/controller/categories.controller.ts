import { Request, Response } from "express";
import { prisma } from '../lib/prisma'

export class CategorieController {
    static async list(req: Request, res: Response) {
        try {
            const categories = await prisma.categories.findMany({})
            if (!categories) {
                return res.status(404).json('Not found')
            }
            return res.send(categories)
        } catch (error) {
            return res.status(400).json({ error })
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const category = req.body
            const createdCategory = await prisma.categories.create({
                data: {
                    name: category.title,
                    active: category.active
                }
            })
            return res.send(createdCategory)
        } catch (error) {
            return res.status(400).json({ error })
        }
    }
}