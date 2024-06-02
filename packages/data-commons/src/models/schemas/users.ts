import { z } from "zod";

import { getValidationResult } from ".";

export const userAccountSchema = z.object({
  id: z.string().min(1),
  email: z.string().min(1),
  password: z.string().min(1),
  telegramId: z.number().positive(),
  createdAt: z.string().min(1),
});
export type UserAccount = z.infer<typeof userAccountSchema>;

export const validateUserAccount = (input: unknown) =>
  getValidationResult<UserAccount>(input, userAccountSchema);
