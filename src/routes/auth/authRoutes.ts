import { Router } from "express";
import { validateLoginRequest } from "@middlewares/auth/validateLoginRequest";
import { loginHandler } from "./login/loginHandler";
import { validateSignupRequest } from "@middlewares/auth/validateSignupRequest";
import { signupHandler } from "./login/signupHandler";
import { validateLoginWithNameRequest } from "@middlewares/auth/validateLoginWithNameRequest";
import { loginHandlerWithUserName } from "./login/userNameLoginHandler";
import { validateForgotPasswordRequest } from "@middlewares/auth/validateForgotPasswordRequest";
import { forgotPasswordHandler } from "./login/forgotPasswordHandler";
import { googleAuth, googleCallback } from "./login/googleAuth"; // جریان Gmail API
import { validateResetPasswordRequest } from "@middlewares/auth/validateResetPasswordRequest";
import { resetPasswordHandler } from "./login/resetPasswordHanlder";

// 👉 اضافه کردن فایل جدید برای Login با Google
import { googleLogin, googleLoginCallback } from "./login/googleLogin";

const authRoutes = Router();

authRoutes.post("/login", validateLoginRequest, loginHandler);
authRoutes.post("/signup", validateSignupRequest, signupHandler);
authRoutes.post(
  "/username-login",
  validateLoginWithNameRequest,
  loginHandlerWithUserName,
);
authRoutes.post(
  "/forgot-password",
  validateForgotPasswordRequest,
  forgotPasswordHandler,
);

authRoutes.post(
  "/reset-password",
  validateResetPasswordRequest,
  resetPasswordHandler,
);

// جریان Gmail API (برای ارسال ایمیل)
authRoutes.get("/google", googleAuth);
authRoutes.get("/oauth2callback", googleCallback);

// جریان Login با Google (برای ورود کاربر)
authRoutes.get("/google-login", googleLogin);
authRoutes.get("/google-login/oauth2callback", googleLoginCallback);

export default authRoutes;
