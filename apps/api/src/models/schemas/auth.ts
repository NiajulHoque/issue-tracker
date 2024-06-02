import { getValidationResult } from "@repo/data-commons";
import { z } from "zod";

export const createAccountEndpointSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
  telegramId: z.number().positive(),
});
export type CreateAccountEndpointSchema = z.infer<
  typeof createAccountEndpointSchema
>;

export const validateCreateAccountEndpointData = (input: unknown) =>
  getValidationResult<CreateAccountEndpointSchema>(
    input,
    createAccountEndpointSchema
  );
