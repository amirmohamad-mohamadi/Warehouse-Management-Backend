import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
    message: "ایمیل معتبر نیست",
  }),
  password: z
    .string()
    .min(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" }),
});

export const loginSchemaWithName = z.object({
  username: z.string().min(6, { message: "نام کاربری باید حداقل ۶ حرف باشد" }),
  password: z
    .string()
    .min(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" }),
});
