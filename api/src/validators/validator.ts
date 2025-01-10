import { z } from "zod";

export class Validator {
  static schema = z
    .object({
      uuid: z.string().uuid().optional(),
      title: z
        .string()
        .min(3, { message: "Title must be at least 3 characters long" })
        .max(100)
        .nonempty("Title is required"),
      description: z
        .string()
        .min(3, { message: "Description must be at least 3 characters long" })
        .max(500),
      dhStart: z
        .string()
        .refine((dateStr) => new Date(dateStr) > new Date(), {
          message: "Start date must be in the future",
        })
        .transform((dateStr) => new Date(dateStr)),
      dhEnd: z
        .string()
        .refine((dateStr) => new Date(dateStr) > new Date(), {
          message: "End date must be in the future",
        })
        .transform((dateStr) => new Date(dateStr)),
      zipCode: z.string().optional(),
      address: z.string().optional(),
      link: z.string().optional(),
      people_limit: z
        .string()
        .refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0, {
          message: "People limit must be a positive number",
        })
        .transform((val) => parseInt(val)),
      categoriesId: z.number().int().positive("Category is required"),
      type: z.enum(["ONLINE", "INPERSON"]),
    })
    .refine(
      (data) => {
        if (data.type === "ONLINE" && !data.link) {
          return false;
        }
        if (data.type === "INPERSON" && !data.address) {
          return false;
        }
        return true;
      },
      {
        message:
          "For online events, the link is required and for in-person events, the address is required.",

        path: ["link", "address"],
      }
    );

  static dataEvent(data: unknown) {
    return this.schema.safeParse(data);
  }
}
