import { type Request, type Response } from "express";

import AuthController from "@controllers/authController.js";
import { setAuthCookie } from "@utils/cookies.js";

export const signupHandler = async (req: Request, res: Response) => {
  try {
    const { user, accessToken, refreshToken } = await AuthController.signup(
      req.body
    );
    setAuthCookie(res, accessToken);

    res.status(201).json({
      success: true,
      data: { user, refreshToken },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: (err as Error).message || "ثبت نام ناموفق بود",
    });
  }
};
