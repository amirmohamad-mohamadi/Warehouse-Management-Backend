import { forgotPasswordSchema } from "@validators/auth/forgotPasswordSchema.js";
import type { Request, Response, NextFunction } from "express";

export const validateForgotPasswordRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = forgotPasswordSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    return res.status(400).json({ success: false, errors });
  }

  next();
};
