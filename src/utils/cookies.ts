import type { Response } from "express";

// SECURE: Helper to set HTTP-only, secure cookies — supports session and token storage
export const setAuthCookie = (res: Response, token: string) => {
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 30, // 30 دقیقه
    path: "/",
  });
};
