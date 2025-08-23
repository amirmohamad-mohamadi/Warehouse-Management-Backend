import { type Response } from "express";

// TYPE: Extended Response type — includes custom metadata, status codes, and optional debug info
export interface ResponseWithMethods extends Response {
  success: (message: string, data?: any) => Response;
  fail: (message: string, statusCode?: number) => Response;
}

export type EnvType = "development" | "production" | "test";
