import { Router } from "express";
import { validateLoginRequest } from "@middlewares/auth/validateLoginRequest.js";
import { loginHandler } from "./login/loginHandler.js";
import { validateSignupRequest } from "@middlewares/auth/validateSignupRequest.js";
import { signupHandler } from "./login/signupHandler.js";

const authRoutes = Router();

authRoutes.post("/login", validateLoginRequest, loginHandler);
authRoutes.post("/signup", validateSignupRequest, signupHandler);

export default authRoutes;
