interface ParsedError {
  message: string;
  code: number;
}

interface SequelizeError extends Error {
  cause?: {
    errno: number;
  };
  errors?: Array<{
    message: string;
    type?: string;
    path?: string;
    value?: any;
  }>;
}

export function slugify(str: string): string {
  return String(str)
    .trim()
    .replaceAll(" ", "-")
    .replaceAll(/-+/g, "-")
    .replaceAll(/[!@#$%^&*+=/\\;:'"|<>(){}[\],?،؟]/g, "")
    .toLowerCase();
}

export function parseDBError(e: unknown): ParsedError {
  const error = e as SequelizeError;

  if (error?.cause?.errno === 1062) {
    const err = error.errors?.[0];
    return {
      message: err?.message || "مقدار تکراری است",
      code: 409,
    };
  }

  if (error?.errors && error.errors.length > 0) {
    const err = error.errors.pop();
    return {
      message: err?.message || "خطا در اعتبارسنجی",
      code: 400,
    };
  }

  return {
    message: DB_ERROR,
    code: 500,
  };
}
