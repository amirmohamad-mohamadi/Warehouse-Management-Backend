import type { EnvType } from "../types/globalTypes.js";

export function resolveEnv(env: string | undefined): EnvType {
  switch (env) {
    case "development":
    case "production":
    case "test":
      return env;
    default:
      return "development";
  }
}
