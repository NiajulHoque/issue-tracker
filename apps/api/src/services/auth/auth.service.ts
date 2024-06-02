import { CreateAccountEndpointSchema } from "@/models/schemas";
import { StoreAccountInDB, SendTelegramMessage } from "@/models";

export const createAccountFactory = (
  storeAccountInDB: StoreAccountInDB,
  sendTelegramMessage: SendTelegramMessage
) => {
  return async (data: CreateAccountEndpointSchema) => {
    await storeAccountInDB(data.email, data.password, data.telegramId);

    await sendTelegramMessage(data.telegramId, "Welcome to the Issue Tracker");

    return {
      message: "Successfully created an account.",
    };
  };
};
