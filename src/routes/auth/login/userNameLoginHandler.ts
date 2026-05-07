import AuthController from "@controllers/authController";
import { setAuthCookie } from "@utils/cookies";
import { type Request, type Response } from "express";
import { loginSchemaWithName } from "@validators/auth/loginSchema"; // اسکیمای مخصوصusername

export const loginHandlerWithUserName = async (req: Request, res: Response) => {
  try {
    // ✅ اول اعتبارسنجی ورودی
    const result = loginSchemaWithName.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return res.status(400).json({ success: false, errors });
    }

    // ✅ اگر ورودی معتبر بود، ادامه می‌دهیم
    const { accessToken, refreshToken, user } =
      await AuthController.loginWithUserName(
        result.data, // داده معتبر از اسکیمای username
      );

    // ست کردن کوکی
    setAuthCookie(res, accessToken);

    // پاسخ موفق
    res.status(200).json({ success: true, data: { user, refreshToken } });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: (error as Error).message || "ورود ناموفق بود",
    });
  }
};
