import {
  createUserAccountDocInMongo,
  hashPasswordWithBcrypt,
  storeAccountInDB,
} from "./auth/auth-impl.service";
import { createAccountFactory } from "./auth/auth.service";
import { sendTelegrafMessage } from "./telegram/telegram-impl.service";
import { sendTelegramMessageFactory } from "./telegram/telegram.service";
import { findByEmail } from "./users/user-impl.service";
import { getUserAccountByEmailFactory } from "./users/user.service";

// TelegramService
export const sendTelegramMessage =
  sendTelegramMessageFactory(sendTelegrafMessage);

// UserService
export const getUserAccountByEmail = getUserAccountByEmailFactory(findByEmail);

// AuthService
export const createAccount = createAccountFactory(
  storeAccountInDB(
    getUserAccountByEmail,
    hashPasswordWithBcrypt,
    createUserAccountDocInMongo
  ),
  sendTelegramMessage
);
