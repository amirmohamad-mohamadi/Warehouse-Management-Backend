import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  createCategorySchema,
  deleteCategorySchema,
  getCategoriesSchema,
  getCategoryByIdSchema,
  updateCategorySchema,
  // createCategorySchema,
  // updateCategorySchema,
} from "@validators/categories/categoriesSchema";

export const validateGetCategoryById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    getCategoryByIdSchema.parse({
      params: req.params,
    });
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message = error.issues[0]?.message || "خطا در اعتبارسنجی";
      return res.fail(message, 400);
    }
    res.fail("خطا در اعتبارسنجی", 400);
  }
};

export const validateGetCategories = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    getCategoriesSchema.parse({
      query: req.query,
    });
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message = error.issues[0]?.message || "خطا در اعتبارسنجی";
      return res.fail(message, 400);
    }
    res.fail("خطا در اعتبارسنجی", 400);
  }
};

export const validateCreateCategory = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    createCategorySchema.parse({
      body: req.body,
    });
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message = error.issues[0]?.message || "خطا در اعتبارسنجی";
      return res.fail(message, 400);
    }
    res.fail("خطا در اعتبارسنجی", 400);
  }
};

export const validateUpdateCategory = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    updateCategorySchema.parse({
      params: req.params,
      body: req.body,
    });
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message = error.issues[0]?.message || "خطا در اعتبارسنجی";
      return res.fail(message, 400);
    }
    res.fail("خطا در اعتبارسنجی", 400);
  }
};

export const validateDeleteCategory = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    deleteCategorySchema.parse({
      params: req.params,
      query: req.query,
    });
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message = error.issues[0]?.message || "خطا در اعتبارسنجی";
      return res.fail(message, 400);
    }
    res.fail("خطا در اعتبارسنجی", 400);
  }
};
