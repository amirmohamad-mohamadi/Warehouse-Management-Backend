import {
  validateCreateCategory,
  validateDeleteCategory,
  validateGetCategories,
  validateGetCategoryById,
  validateUpdateCategory,
} from "@middlewares/categories/validateCategoriesRequest";
import express from "express";
import {
  createCategoryHandler,
  deleteCategoryHandler,
  getCategoriesHandler,
  getCategoryByIdHandler,
  updateCategoryHandler,
} from "./categoriesHandler";

const router = express.Router();

router.get("/:id", validateGetCategoryById, getCategoryByIdHandler);
router.get("/", validateGetCategories, getCategoriesHandler);
router.post("/", validateCreateCategory, createCategoryHandler);
router.put("/:id", validateUpdateCategory, updateCategoryHandler);
router.delete("/:id", validateDeleteCategory, deleteCategoryHandler);

export default router;
