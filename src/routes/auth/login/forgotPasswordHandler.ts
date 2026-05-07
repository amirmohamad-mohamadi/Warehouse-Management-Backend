import AuthController from "@controllers/authController";
import { type Request, type Response } from "express";

export const forgotPasswordHandler = async (req: Request, res: Response) => {
  try {
    const { message } = await AuthController.forgotPassword(req.body);

    res.status(200).json({
      success: true,
      data: {
        message,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: (error as Error).message || "ارسال لینک بازیابی ناموفق بود",
    });
  }
};
