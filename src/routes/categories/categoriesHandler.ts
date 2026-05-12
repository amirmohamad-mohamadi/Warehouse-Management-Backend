import CategoriesController from "@controllers/categoriesController";
import type { Request, Response } from "express";

export const getCategoryByIdHandler = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;

    if (!idParam) {
      return res.status(400).json({
        success: false,
        message: "شناسه دسته مشخص نشده است",
      });
    }

    const id = parseInt(idParam);
    const category = await CategoriesController.getCategoryById(id);

    res.status(200).json({
      success: true,
      message: "دسته با موفقیت خوانده شد",
      data: category,
    });
  } catch (error) {
    const err = error as Error;
    const statusCode = (error as any).statusCode || 500;
    const message = err.message || "خطا در دریافت دسته";

    res.status(statusCode).json({
      success: false,
      message,
    });
  }
};

export const getCategoriesHandler = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const q = (req.query.q as string) || "";

    const result = await CategoriesController.getCategories({
      limit,
      page,
      q,
    });

    res.status(200).json({
      success: true,
      message: "دسته‌ها با موفقیت خوانده شدند",
      data: result.categories,
      pagination: result.pagination,
    });
  } catch (error) {
    const err = error as Error;
    const statusCode = (error as any).statusCode || 500;
    const message = err.message || "خطا در دریافت دسته‌ها";

    res.status(statusCode).json({
      success: false,
      message,
    });
  }
};

export const createCategoryHandler = async (req: Request, res: Response) => {
  try {
    const { title, slug } = req.body;

    const category = await CategoriesController.createCategory({ title, slug });

    res.status(201).json({
      success: true,
      message: "دسته با موفقیت ایجاد شد",
      data: category,
    });
  } catch (error) {
    const err = error as Error;
    const statusCode = (error as any).statusCode || 500;
    const message = err.message || "خطا در ایجاد دسته";

    res.status(statusCode).json({
      success: false,
      message,
    });
  }
};

export const updateCategoryHandler = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: "شناسه دسته مشخص نشده است",
      });
    }

    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "شناسه دسته معتبر نیست",
      });
    }

    const { title, slug } = req.body;

    const updateData: { title?: string; slug?: string } = {};
    if (title) updateData.title = title;
    if (slug) updateData.slug = slug;

    const category = await CategoriesController.updateCategory(id, updateData);

    res.status(200).json({
      success: true,
      message: "دسته با موفقیت بروزرسانی شد",
      data: category,
    });
  } catch (error) {
    const err = error as Error;
    const statusCode = (error as any).statusCode || 500;
    const message = err.message || "خطا در بروزرسانی دسته";

    res.status(statusCode).json({
      success: false,
      message,
    });
  }
};

export const deleteCategoryHandler = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const force = req.query.force === "true";

    await CategoriesController.deleteCategory(id, force);

    res.status(200).json({
      success: true,
      message: "دسته با موفقیت حذف شد",
    });
  } catch (error) {
    const err = error as Error;
    const statusCode = (error as any).statusCode || 500;
    const message = err.message || "خطا در حذف دسته";

    res.status(statusCode).json({
      success: false,
      message,
    });
  }
};
