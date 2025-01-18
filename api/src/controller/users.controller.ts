import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export class UserController {
  static async create(req: Request, res: Response) {
    try {
      const { email, password, userId } = req.body;

      const existingUser = await prisma.users.findUnique({
        where: { token: userId },
      });

      if (existingUser) {
        return res.status(400).json("User already exists");
      }

      const user = await prisma.users.create({
        data: {
          email,
          password,
          token: userId,
          name: email.split("@")[0],
        },
      });

      return res.send(user);
    } catch (error) {
      return res.status(400).json("An unexpected error occurred.");
    }
  }
}
