import { UserAccount, validateUserAccount } from "@repo/data-commons";

import { UserModel } from "@/models";

export const findByEmail = async (
  email: string
): Promise<UserAccount | null> => {
  const userDocument = await UserModel.findOne({ email }).exec();
  if (!userDocument) {
    return null;
  }

  const validatedUserAccount = validateUserAccount({
    ...userDocument,
    id: userDocument._id,
  });
  if (!validatedUserAccount.success) {
    return Promise.reject(validatedUserAccount.error);
  }

  return validatedUserAccount.value;
};
