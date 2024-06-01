import { z } from "zod";

export const getZodErrorMessage = <T>(error: z.ZodError<T>) => {
  return error.issues
    .map((issue) => `${issue.message}: ${issue.path}`)
    .join(", ");
};
