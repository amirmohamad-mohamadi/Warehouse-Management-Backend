import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "توکن الزامی است"),
    password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن یکسان نیست",
    path: ["confirmPassword"],
  });

export const validateResetPasswordRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    resetPasswordSchema.parse(req.body);
    next();
  } catch (err: any) {
    return res.status(400).json({ error: err.errors });
  }
};
