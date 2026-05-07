import AuthController from "@controllers/authController";
import { setAuthCookie } from "@utils/cookies";
import { type Request, type Response } from "express";

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { accessToken, refreshToken, user } = await AuthController.login(
      req.body,
    );
    setAuthCookie(res, accessToken);
    res.status(200).json({ success: true, data: { user, refreshToken } });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: (error as Error).message || "ورود ناموفق بود",
    });
  }
};
