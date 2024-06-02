import { UserAccount } from "@repo/data-commons";

import { FindByEmail } from "@/models";

export const getUserAccountByEmailFactory = (findByEmail: FindByEmail) => {
  return async (email: string): Promise<UserAccount | null> => {
    return findByEmail(email);
  };
};
