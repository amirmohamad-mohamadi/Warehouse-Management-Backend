import { loginSchema, loginSchemaWithName } from "@validators/auth/loginSchema";
import type { Request, Response, NextFunction } from "express";

export const validateLoginWithNameRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = loginSchemaWithName.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    return res.status(400).json({ success: false, errors });
  }

  next();
};
