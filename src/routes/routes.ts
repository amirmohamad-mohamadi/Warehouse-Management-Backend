// src/routes/index.ts
import { Router } from "express";
import authRoutes from "./auth/authRoutes";
// import userRoutes from "./userRoutes"; ← در آینده اضافه می‌کنی
import categoriesRoutes from "./categories/categoriesRoutes";

const router = Router();

router.use("/auth", authRoutes);
// router.use("/users", userRoutes); ← مثال برای آینده

router.use("/categories", categoriesRoutes);

export default router;
