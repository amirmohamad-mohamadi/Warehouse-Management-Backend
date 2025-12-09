// src/controllers/authController.ts
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@models/User.js";
import config from "@config/config.js";

class AuthController {
  // 🔹 تابع کمکی برای تولید توکن‌ها
  private static generateTokens(userId: number) {
    const accessToken = jwt.sign({ id: userId }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });

    const refreshToken = jwt.sign({ id: userId }, config.jwt.refreshSecret, {
      expiresIn: config.jwt.refreshExpiresIn,
    });

    return { accessToken, refreshToken };
  }

  // 🔹 login با ایمیل یا username
  static async login(body: {
    email?: string;
    username?: string;
    password: string;
  }) {
    const whereClause =
      typeof body?.email === "string" && body.email.includes("@")
        ? { email: body.email }
        : { username: body?.username };

    const user = await User.findOne({ where: whereClause });
    if (!user) throw new Error("کاربر یافت نشد");

    const isMatch = await compare(body.password, user.password);
    if (!isMatch) throw new Error("رمز عبور اشتباه است");

    const { accessToken, refreshToken } = this.generateTokens(user.id);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    };
  }

  // 🔹 login فقط با username
  static async loginWithUserName(body: { username: string; password: string }) {
    const user = await User.findOne({ where: { username: body.username } });
    if (!user) throw new Error("کاربر یافت نشد");

    const isMatch = await compare(body.password, user.password);
    if (!isMatch) throw new Error("رمز عبور اشتباه است");

    const { accessToken, refreshToken } = this.generateTokens(user.id);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    };
  }

  // 🔹 signup
  static async signup(body: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }) {
    if (body.password !== body.confirmPassword) {
      throw new Error("رمز عبور و تکرار آن یکسان نیستند");
    }

    // بررسی تکراری بودن ایمیل یا username
    if (await User.findOne({ where: { email: body.email } })) {
      throw new Error("ایمیل قبلاً ثبت شده");
    }

    if (await User.findOne({ where: { username: body.username } })) {
      throw new Error("نام کاربری قبلاً ثبت شده");
    }

    const hashedPassword = await hash(body.password, 10);

    const user = await User.create({
      username: body.username,
      email: body.email,
      password: hashedPassword,
    });

    const { accessToken, refreshToken } = this.generateTokens(user.id);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    };
  }
}

export default AuthController;
