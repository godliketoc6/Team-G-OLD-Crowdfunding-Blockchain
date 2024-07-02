import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().refine((value) => /^[a-zA-Z ]+$/.test(value), {
      message: "Name must only contain letters and spaces",
    }),
    email: z.string().email(),
    password: z.string().min(10, "Password must be at least 10 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match!",
    path: ["confirmPassword"],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;
