import { object, string } from "zod";

export const contactFormSchema = object({
  email: string({ required_error: "An email address is required." })
    .min(1, "An email address is required.")
    .email("The entered value is invalid."),
  message: string({ required_error: "A message is required" })
  .min(50, "You need at least 50 characters.")
  .max(1000, "You've reached the maximum amount of 1000 characters."),
});