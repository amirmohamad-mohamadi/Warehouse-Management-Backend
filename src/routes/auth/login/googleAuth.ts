import { type Request, type Response } from "express";
import axios from "axios";
import qs from "qs";

export const googleAuth = (req: Request, res: Response) => {
  const redirectUri = "http://localhost:3000/api/v1/wms/auth/oauth2callback";

  // 🔑 باید scope کامل باشه
  const scope = "https://mail.google.com/";

  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
    process.env.GMAIL_CLIENT_ID
  }&redirect_uri=${redirectUri}&response_type=code&scope=${encodeURIComponent(
    scope
  )}&access_type=offline&prompt=consent`;

  res.redirect(url);
};

export const googleCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string;
  console.log("Authorization Code:", code);

  if (!code) {
    return res.status(400).send("Authorization code not found");
  }

  try {
    const redirectUri = "http://localhost:3000/api/v1/wms/auth/oauth2callback";

    const data = {
      code,
      client_id: process.env.GMAIL_CLIENT_ID,
      client_secret: process.env.GMAIL_CLIENT_SECRET,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    };

    const response = await axios.post(
      "https://oauth2.googleapis.com/token",
      qs.stringify(data),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token, refresh_token, scope } = response.data;

    console.log("Access Token:", access_token);
    console.log("Refresh Token:", refresh_token);
    console.log("Scope:", scope);

    // این Refresh Token رو ذخیره کن توی .env
    res.send("✅ Tokens received! Check console.");
  } catch (err: any) {
    res.status(500).send("Error exchanging code for tokens");
  }
};
