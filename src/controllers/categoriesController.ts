import { Op } from "@sequelize/core";
import type { Request, Response } from "express";
import Stuff from "../models/StuffModel.js";
import Category from "@models/Category.js";
import { parseDBError } from "@utils/helperFunction.js";

export default class CategoriesController {
  static async getCategoryById(id: number) {
    const cat = await Category.findByPk(id);

    if (!cat) {
      const error: any = new Error("دسته یافت نشد");
      error.statusCode = 404;
      throw error;
    }

    return cat;
  }

  static async getCategories(options: {
    limit: number;
    page: number;
    q: string;
  }) {
    const { limit, page, q } = options;

    const whereCondition = q
      ? {
          [Op.or]: [
            { title: { [Op.like]: `%${q}%` } },
            { slug: { [Op.like]: `%${q}%` } },
          ],
        }
      : {};

    const { rows, count } = await Category.findAndCountAll({
      where: whereCondition,
      limit,
      offset: (page - 1) * limit,
    });

    return {
      categories: rows,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  static async createCategory(data: { title: string; slug: string }) {
    const { title, slug } = data;

    const existingCategory = await Category.findOne({ where: { slug } });
    if (existingCategory) {
      const error = new Error("اسلاگ تکراری است");
      (error as any).statusCode = 409;
      throw error;
    }

    const category = await Category.create({ title, slug });
    return category;
  }

  static async updateCategory(
    id: number,
    data: { title?: string; slug?: string },
  ) {
    const category = await Category.findByPk(id);
    if (!category) {
      const error = new Error("دسته یافت نشد");
      (error as any).statusCode = 404;
      throw error;
    }

    if (data.slug && data.slug !== category.slug) {
      const existingCategory = await Category.findOne({
        where: { slug: data.slug },
      });
      if (existingCategory) {
        const error = new Error("اسلاگ تکراری است");
        (error as any).statusCode = 409;
        throw error;
      }
    }

    await category.update(data);

    return category;
  }

  static async deleteCategory(id: number, force: boolean = false) {
    const category = await Category.findByPk(id);
    if (!category) {
      const error = new Error("دسته یافت نشد");
      (error as any).statusCode = 404;
      throw error;
    }

    const relatedStuffs = await Stuff.findOne({ where: { categoryId: id } });

    if (relatedStuffs && !force) {
      const error = new Error("این دسته دارای کالا است و قابل حذف نیست");
      (error as any).statusCode = 403;
      throw error;
    }

    await category.destroy();

    return { success: true, message: "دسته با موفقیت حذف شد" };
  }
}
