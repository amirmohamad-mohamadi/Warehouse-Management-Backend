// src\controllers\authController.ts

import { compare, hash } from "bcrypt";
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

  static async signup(body: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    if (body.password !== body.confirmPassword) {
      throw new Error("رمز عبور و تکرار آن یکسان نیستند");
    }

    const existing = await User.findOne({ where: { email: body.email } });
    if (existing) throw new Error("ایمیل قبلاً ثبت شده");

    const hashedPassword = await hash(body.password, 10);

    const user = await User.create({
      fullName: body.name,
      email: body.email,
      password: hashedPassword,
    });

    const accessToken = jwt.sign({ id: user.id }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });

    const refreshToken = jwt.sign({ id: user.id }, config.jwt.refreshSecret, {
      expiresIn: config.jwt.refreshExpiresIn,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.fullName,
      },
    };
  }
}

export default AuthController;
