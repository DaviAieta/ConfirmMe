import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export class CategoriesController {
  static async List(req: Request, res: Response) {
    try {
      const categories = await prisma.categories.findMany({
        include: {
          _count: {
            select: { Events: true },
          },
        },
      });

      if (!categories) {
        return res.status(400).json("Categories not found");
      }

      return res.send(categories);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  static async Create(req: Request, res: Response) {
    try {
      const category = req.body;
      const createdCategory = await prisma.categories.create({
        data: {
          name: category.name,
          color: category.color,
        },
      });
      return res.send(createdCategory);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  static async findOne(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const category = await prisma.categories.findUnique({
        where: { uuid },
        include: {
          Events: {
            include: {
              Guests: true,
            },
          },
          _count: {
            select: { Events: true },
          },
        },
      });

      if (!category) {
        return res.status(404).json("category not found");
      }

      return res.send(category);
    } catch (error) {
      return res.status(400).json("Error");
    }
  }

  static async Delete(req: Request, res: Response) {
    try {
      const { uuid } = req.body;

      const category = await prisma.categories.findUnique({
        where: { uuid },
      });

      if (!category) {
        return res.status(400).json("Category not found");
      }

      const deletedCategory = await prisma.categories.delete({
        where: category,
      });

      return res.send(deletedCategory);
    } catch {
      return res.status(400).json("error");
    }
  }

  static async Update(req: Request, res: Response) {
    try {
      const category = req.body;

      const updatedEvent = await prisma.categories.update({
        where: {
          uuid: category.uuid,
        },
        data: {
          name: category.name,
          color: category.color,
        },
      });

      return res.send(updatedEvent);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}
