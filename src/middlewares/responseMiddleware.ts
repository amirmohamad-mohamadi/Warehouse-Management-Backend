import type { NextFunction, Request, Response } from "express";

// TODO: Simple response logger — can be extended to write to file or database
function logResponse(
  req: Request,
  status: number,
  success: boolean,
  message: string,
) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${
      req.originalUrl
    } → ${status} ${success ? "✅" : "❌"} ${message}`,
  );
}

export default function responseMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (!res.success) {
    res.success = (
      message: string = "",
      body: any = null,
      status: number = 200,
    ): Response => {
      logResponse(req, status, true, message);
      return res.status(status).json({
        success: true,
        body,
        message,
        status,
      });
    };
  }

  if (!res.fail) {
    res.fail = (
      message: string = "",
      status: number = 400,
      body: any = null,
    ): Response => {
      logResponse(req, status, false, message);
      return res.status(status).json({
        success: false,
        body,
        message,
        status,
      });
    };
  }

  next();
}
