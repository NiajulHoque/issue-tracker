import { UserAccount } from "@repo/data-commons";

export type StoreAccountInDB = (
  email: string,
  password: string,
  telegramId: number
) => Promise<void>;

export type HashPassword = (plainTextPassword: string) => Promise<string>;

export type CreateDocument = (
  userAccount: Omit<UserAccount, "id">
) => Promise<{ message: string }>;
