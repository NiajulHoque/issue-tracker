import bcrypt from "bcrypt";

import {
  CreateDocument,
  FindByEmail,
  HashPassword,
  StoreAccountInDB,
  UserModel,
} from "@/models";
import { UserAccount } from "@repo/data-commons";

export const storeAccountInDB = (
  getUserAccountByEmail: FindByEmail,
  hashPassword: HashPassword,
  createDocument: CreateDocument
): StoreAccountInDB => {
  return async (
    email: string,
    password: string,
    telegramId: number
  ): Promise<void> => {
    const userAccountFetched = await getUserAccountByEmail(email);
    if (userAccountFetched) {
      return Promise.reject(
        new Error("An account with this email already exists.")
      );
    }

    const hashedPassword = await hashPassword(password);
    const userAccount: Omit<UserAccount, "id"> = {
      email,
      password: hashedPassword,
      telegramId,
      createdAt: new Date().toISOString(),
    };

    await createDocument(userAccount);
  };
};

export const hashPasswordWithBcrypt: HashPassword = async (
  plainTextPassword: string
): Promise<string> => {
  const hashedPassword = await new Promise<string>((resolve, reject) => {
    bcrypt.hash(plainTextPassword, 10, function (err, hash) {
      if (err) {
        reject(err);
      }
      resolve(hash);
    });
  });

  return hashedPassword;
};

export const createUserAccountDocInMongo: CreateDocument = async (
  userAccount: Omit<UserAccount, "id">
) => {
  await UserModel.create(userAccount);

  return {
    message: "Created user document",
  };
};
