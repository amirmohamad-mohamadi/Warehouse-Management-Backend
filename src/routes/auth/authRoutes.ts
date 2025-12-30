import { Router } from "express";
import { validateLoginRequest } from "@middlewares/auth/validateLoginRequest.js";
import { loginHandler } from "./login/loginHandler.js";
import { validateSignupRequest } from "@middlewares/auth/validateSignupRequest.js";
import { signupHandler } from "./login/signupHandler.js";
import { validateLoginWithNameRequest } from "@middlewares/auth/validateLoginWithNameRequest.js";
import { loginHandlerWithUserName } from "./login/userNameLoginHandler.js";
import { validateForgotPasswordRequest } from "@middlewares/auth/validateForgotPasswordRequest.js";
import { forgotPasswordHandler } from "./login/forgotPasswordHandler.js";
import { googleAuth, googleCallback } from "./login/googleAuth.js"; // جریان Gmail API
import { validateResetPasswordRequest } from "@middlewares/auth/validateResetPasswordRequest.js";
import { resetPasswordHandler } from "./login/resetPasswordHanlder.js";

// 👉 اضافه کردن فایل جدید برای Login با Google
import { googleLogin, googleLoginCallback } from "./login/googleLogin.js";

const authRoutes = Router();

authRoutes.post("/login", validateLoginRequest, loginHandler);
authRoutes.post("/signup", validateSignupRequest, signupHandler);
authRoutes.post(
  "/username-login",
  validateLoginWithNameRequest,
  loginHandlerWithUserName
);
authRoutes.post(
  "/forgot-password",
  validateForgotPasswordRequest,
  forgotPasswordHandler
);

authRoutes.post(
  "/reset-password",
  validateResetPasswordRequest,
  resetPasswordHandler
);

// جریان Gmail API (برای ارسال ایمیل)
authRoutes.get("/google", googleAuth);
authRoutes.get("/oauth2callback", googleCallback);

// جریان Login با Google (برای ورود کاربر)
authRoutes.get("/google-login", googleLogin);
authRoutes.get("/google-login/oauth2callback", googleLoginCallback);

export default authRoutes;
