// src/routes/auth/login/googleLogin.ts
import { type Request, type Response } from "express";
import axios from "axios";
import qs from "qs";
import jwt from "jsonwebtoken";

export const googleLogin = (req: Request, res: Response) => {
  const redirectUri =
    "http://localhost:3000/api/v1/wms/auth/google-login/oauth2callback";

  const scope = "openid email profile";

  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
    process.env.GOOGLE_CLIENT_ID
  }&redirect_uri=${redirectUri}&response_type=code&scope=${encodeURIComponent(
    scope
  )}&access_type=offline&prompt=consent`;

  res.redirect(url);
};

export const googleLoginCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string;

  if (!code) {
    return res.status(400).json({
      success: false,
      message: "Authorization code not found",
    });
  }

  try {
    const redirectUri =
      "http://localhost:3000/api/v1/wms/auth/google-login/oauth2callback";

    const data = {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    };

    const response = await axios.post(
      "https://oauth2.googleapis.com/token",
      qs.stringify(data),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { id_token } = response.data;

    const userInfo = JSON.parse(
      Buffer.from(id_token.split(".")[1], "base64").toString()
    );

    const profile = {
      email: userInfo.email,
      name: userInfo.name,
      picture: userInfo.picture,
      sub: userInfo.sub,
    };

    const appAccessToken = jwt.sign(
      { email: profile.email },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    const appRefreshToken = jwt.sign(
      { email: profile.email, type: "refresh" },
      process.env.JWT_SECRET!,
      { expiresIn: "30d" }
    );

    res.cookie("accessToken", appAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.redirect(
      `http://localhost:5173/auth/google-login/callback?` +
        `refreshToken=${appRefreshToken}&` +
        `email=${profile.email}&` +
        `sub=${profile.sub}`
    );
  } catch (err: any) {
    console.error("Google Login Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Error exchanging code for tokens",
    });
  }
};
