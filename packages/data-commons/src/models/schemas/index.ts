import { z } from "zod";

import { getZodErrorMessage } from "../../utils";

export const getValidationResult = <T>(input: unknown, schema: z.ZodSchema) => {
  const { data, success, error } = schema.safeParse(input);
  return success === true
    ? ({ success, value: data as T } as const)
    : ({
        success: false,
        error: getZodErrorMessage(error),
      } as const);
};

export * from "./users";
