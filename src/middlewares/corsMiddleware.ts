import type { Request, Response, NextFunction } from "express";

export default function corsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const allowedOrigins = [
    "http://localhost:5173",
    "http://10.207.145.46:5173",
    "http://192.168.208.1:5173",
  ];

  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true"); // TODO: Responsible for setting cookies in the response

    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );

    if (req.method === "OPTIONS") {
      // TODO: Handling CORS preflight request (OPTIONS method)
      res.sendStatus(204);

      return;
    }
  } else {
    // WARNING: Even if the origin is not allowed, we must respond to OPTIONS requests
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Origin", "null");

      // TODO: Use HTTP 204 for silent responses (no content)
      res.sendStatus(403);
      return;
    }
  }

  next();
}
