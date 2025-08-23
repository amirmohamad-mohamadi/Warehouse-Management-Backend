// src\controllers\authController.ts

import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@models/User.js";
import config from "@config/config.js";

class AuthController {
  // TODO: This controller only returns data without any side effects
  static async login(body: { email: string; password: string }) {
    const user = await User.findOne({ where: { email: body.email } });
    if (!user) throw new Error("کاربر یافت نشد");

    const isMatch = await compare(body.password, user.password);
    if (!isMatch) throw new Error("رمز عبور اشتباه است");

    const accessToken = jwt.sign({ id: user.id }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });

    const refreshToken = jwt.sign({ id: user.id }, config.jwt.refreshSecret, {
      expiresIn: config.jwt.refreshExpiresIn,
    });

    return {
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email },
    };
  }
}

export default AuthController;
