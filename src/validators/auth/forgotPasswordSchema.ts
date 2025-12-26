import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "ایمیل الزامی است")
    .email("ایمیل معتبر وارد کنید"),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
