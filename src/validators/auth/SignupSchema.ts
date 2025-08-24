import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(6, { message: "نام باید حداقل ۶ حرف باشد" }),
    email: z.email({ message: "فرمت ایمیل نامعتبر است" }),
    password: z.string().min(6, { message: "رمز عبور باید حداقل ۶ حرف باشد" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن یکسان نیستند",
    path: ["confirmPassword"],
  });
