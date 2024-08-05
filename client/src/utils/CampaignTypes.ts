import { z } from "zod";

export const createCampaignSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Story is required").max(150, "Story must be less than 150 characters"),
  target: z.string({
    invalid_type_error: "Goal must be a number",
    required_error: "Goal is required",
  }),
  deadline: z.date().refine((date) => date > new Date(), {
    message: "Deadline must be a future date",
  }).nullable().refine((date) => date !== null, {
    message: "Deadline is required",
  }),
  image: z.string().url("Invalid image URL").min(1, "URL is required"),
});

export type TCreateCampaignSchema = z.infer<typeof createCampaignSchema>;
