import { Router } from "express";
import { validateLoginRequest } from "@middlewares/auth/validateLoginRequest.js";
import { loginHandler } from "./login/loginHandler.js";
import { validateSignupRequest } from "@middlewares/auth/validateSignupRequest.js";
import { signupHandler } from "./login/signupHandler.js";
import { validateLoginWithNameRequest } from "@middlewares/auth/validateLoginWithNameRequest.js";
import { loginHandlerWithUserName } from "./login/userNameLoginHandler.js";

const authRoutes = Router();

authRoutes.post("/login", validateLoginRequest, loginHandler);
authRoutes.post("/signup", validateSignupRequest, signupHandler);

authRoutes.post(
  "/username-login",
  validateLoginWithNameRequest,
  loginHandlerWithUserName
);

export default authRoutes;
