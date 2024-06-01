import { z } from "zod";

import { getZodErrorMessage } from "@repo/data-commons";

import { CreateAccountSchema, createAccountSchema } from "@/models/schemas";

export const createAccountFactory = () => {
  return (reqData: unknown) => {
    // 1. validate incoming data using zod
    const { data, success, error } = createAccountSchema.safeParse(reqData);
    if (!success) {
      return Promise.reject(
        new Error(getZodErrorMessage<CreateAccountSchema>(error))
      );
    }

    // 2. hash the password using bcrypt
    // 3. create a new user account object, pass in the hashed password as the password value
    // 4. pass in this object to the db service to save it into the DB

    return {
      message: "Successfully created an account",
    };
  };
};
