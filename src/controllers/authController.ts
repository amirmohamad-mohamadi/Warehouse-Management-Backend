import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "@models/User";
import config from "@config/config";
import { sendResetEmail } from "@utils/mailer";
import { Op } from "@sequelize/core";

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

  // 🔹 forgotPassword
  static async forgotPassword(body: { email: string }) {
    const user = await User.findOne({ where: { email: body.email } });
    if (!user) throw new Error("کاربری با این ایمیل یافت نشد");
    // ساخت توکن ریست
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const expiry = new Date(Date.now() + 1000 * 60 * 15); // اعتبار 15 دقیقه

    user.resetToken = hashedToken;
    user.resetTokenExpiry = expiry;
    await user.save();

    // ارسال ایمیل با لینک
    await sendResetEmail(user.email, resetToken);

    return {
      message: "لینک تغییر رمز ارسال شد",
    };
  }

  static async resetPassword(body: { token: string; password: string }) {
    const hashedToken = crypto
      .createHash("sha256")
      .update(body.token)
      .digest("hex");

    // پیدا کردن کاربر با توکن معتبر
    const user = await User.findOne({
      where: {
        resetToken: hashedToken,
        resetTokenExpiry: { [Op.gt]: new Date() }, // اعتبار هنوز تمام نشده
      },
    });

    if (!user) throw new Error("توکن نامعتبر یا منقضی شده است");

    // هش کردن رمز جدید
    const hashedPassword = await hash(body.password, 10);

    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    return {
      message: "رمز عبور با موفقیت تغییر کرد",
    };
  }
}

export default AuthController;
