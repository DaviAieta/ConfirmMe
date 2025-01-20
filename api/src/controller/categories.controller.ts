import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { Prisma } from "@prisma/client";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(1, "Name is required "),
  color: z.string().min(1, "Color is required "),
  userId: z.string().nonempty("User ID is required"),
  uuid: z.string().optional(),
});

export class CategoriesController {
  static async list(req: Request, res: Response) {
    try {
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

      const categories = await prisma.categories.findMany({
        where: { usersId: user.id },
        include: {
          _count: {
            select: { Events: true },
          },
        },
      });

      return res.send(categories);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json("Internal Error.");
      }
      return res.status(400).json("An unexpected error occurred.");
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const category = categorySchema.parse(req.body);

      const user = await prisma.users.findUnique({
        where: { token: category.userId },
      });

      if (!user) {
        return res.status(404).json("User not found.");
      }

      const createdCategory = await prisma.categories.create({
        data: {
          name: category.name,
          color: category.color,
          usersId: user.id,
        },
      });

      return res.send(createdCategory);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        return res.status(400).json(errorMessages);
      }
      return res.status(400).json("An unexpected error occurred.");
    }
  }

  static async findOne(req: Request, res: Response) {
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

      const category = await prisma.categories.findUnique({
        where: { uuid },
        include: {
          Events: {
            include: {
              EventGuest: {
                include: {
                  guest: true,
                },
              },
            },
          },
          _count: {
            select: { Events: true },
          },
        },
      });

      if (!category || category.usersId !== user.id) {
        return res
          .status(403)
          .json("You are not authorized to view this category.");
      }

      return res.send(category);
    } catch {
      return res.status(400).json("An unexpected error occurred.");
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { uuid, userId } = req.body;

      const user = await prisma.users.findUnique({
        where: { token: userId },
      });

      if (!user) {
        return res.status(404).json("User not found.");
      }

      const category = await prisma.categories.findUnique({
        where: { uuid },
        include: {
          _count: {
            select: { Events: true },
          },
        },
      });

      if (!category) {
        return res.status(400).json("Category Not Found");
      }

      if (category._count.Events > 0) {
        return res
          .status(400)
          .json("Cannot delete category with linked events.");
      }

      const deletedCategory = await prisma.categories.delete({
        where: {
          id: category.id,
        },
      });

      return res.send(deletedCategory);
    } catch (error) {
      return res.status(400).json("An unexpected error occurred.");
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const category = categorySchema.parse(req.body);

      const user = await prisma.users.findUnique({
        where: { token: category.userId },
      });

      if (!user) {
        return res.status(404).json("User not found.");
      }

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
      if (error instanceof z.ZodError) {
        const validationErrors = error.errors.map((err) => err.message);
        return res.status(400).json(validationErrors);
      }
      return res.status(400).json("An unexpected error occurred.");
    }
  }
}
