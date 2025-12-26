import AuthController from "@controllers/authController.js";
import { type Request, type Response } from "express";

export const resetPasswordHandler = async (req: Request, res: Response) => {
  try {
    const { message } = await AuthController.resetPassword(req.body);

    res.status(200).json({
      success: true,
      data: {
        message,
      },
    });
  } catch (error) {
    console.error("ResetPassword error:", error);
    res.status(400).json({
      success: false,
      message: (error as Error).message || "تغییر رمز عبور ناموفق بود",
    });
  }
};
