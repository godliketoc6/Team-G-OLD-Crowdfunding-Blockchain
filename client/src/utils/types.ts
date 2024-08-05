import { z } from "zod";

export const signUpSchema = z
  .object({
    username: z
    .string()
    .min(3, "Username must be at least 3 characters long") // Minimum length of 3 characters
    .refine((value) => /^[a-zA-Z ]+$/.test(value), {
      message: "Username must only contain letters and spaces",
    }),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match!",
    path: ["confirmPassword"],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;
