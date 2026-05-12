// src/routes/categoryRoutes.ts
import { z } from "zod";

export const getCategoryByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "شناسه باید عدد باشد"),
  }),
});

export const getCategoriesSchema = z.object({
  query: z.object({
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : undefined))
      .pipe(z.number().int().positive().max(100).optional().default(10)),
    page: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : undefined))
      .pipe(z.number().int().positive().optional().default(1)),
    q: z.string().optional().default(""),
  }),
});

export const createCategorySchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, "عنوان باید حداقل 3 کاراکتر باشد")
      .max(50, "عنوان باید حداکثر 50 کاراکتر باشد"),
    slug: z
      .string()
      .min(3, "اسلاگ باید حداقل 3 کاراکتر باشد")
      .max(50, "اسلاگ باید حداکثر 50 کاراکتر باشد")
      .regex(
        /^[a-z0-9-]+$/,
        "اسلاگ فقط می‌تواند شامل حروف کوچک انگلیسی، اعداد و خط تیره باشد",
      ),
  }),
});

export const updateCategorySchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "شناسه باید عدد باشد"),
  }),
  body: z
    .object({
      title: z
        .string()
        .min(3, "عنوان باید حداقل 2 کاراکتر باشد")
        .max(50, "عنوان باید حداکثر 30 کاراکتر باشد")
        .optional(),
      slug: z
        .string()
        .min(3, "اسلاگ باید حداقل 2 کاراکتر باشد")
        .max(50, "اسلاگ باید حداکثر 30 کاراکتر باشد")
        .regex(
          /^[a-z0-9-]+$/,
          "اسلاگ فقط می‌تواند شامل حروف کوچک انگلیسی، اعداد و خط تیره باشد",
        )
        .optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "حداقل یکی از فیلدهای title یا slug باید ارسال شود",
    }),
});

export const deleteCategorySchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "شناسه باید عدد باشد"),
  }),
  query: z.object({
    force: z
      .string()
      .optional()
      .transform((val) => val === "true")
      .default(false),
  }),
});
