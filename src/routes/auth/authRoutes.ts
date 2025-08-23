// src/routes/authRoutes.ts
import { Router } from "express";
import { validateLoginRequest } from "@middlewares/auth/validateLoginRequest.js";
import AuthController from "@controllers/authController.js";

const authRoutes = Router();

// SECURE: Helper to set HTTP-only, secure cookies — supports session and token storage
const setAuthCookie = (res: any, token: string) => {
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 30, // 30 دقیقه
  });
};

authRoutes.post("/login", validateLoginRequest, async (req, res) => {
  try {
    const { accessToken, refreshToken, user } = await AuthController.login(
      req.body
    );

    setAuthCookie(res, accessToken);

    res.status(200).json({
      success: true,
      data: {
        user,
        refreshToken,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({
      success: false,
      message: (error as Error).message || "ورود ناموفق بود",
    });
  }
});

export default authRoutes;
