import "express";

declare module "express-serve-static-core" {
  interface Response {
    success(message: string, data?: any, statusCode?: number): this;
    fail(message: string, statusCode?: number): this;
  }
}

export type EnvType = "development" | "production" | "test";
