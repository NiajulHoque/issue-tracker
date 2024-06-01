import { z } from "zod";

export const createAccountSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});
export type CreateAccountSchema = z.infer<typeof createAccountSchema>;
