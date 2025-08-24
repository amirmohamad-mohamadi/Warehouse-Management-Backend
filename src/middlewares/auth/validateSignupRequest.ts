import { signupSchema } from "@validators/auth/SignupSchema.js";
import type { Request, Response, NextFunction } from "express";

export const validateSignupRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    return res.status(422).json({
      success: false,
      message: "ورودی نامعتبر",
      errors,
    });
  }

  next();
};
