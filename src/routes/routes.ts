// src/routes/index.ts
import { Router } from "express";
import authRoutes from "./auth/authRoutes";
// import userRoutes from "./userRoutes"; ← در آینده اضافه می‌کنی

const router = Router();

router.use("/auth", authRoutes);
// router.use("/users", userRoutes); ← مثال برای آینده

export default router;
