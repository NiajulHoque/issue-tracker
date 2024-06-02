import { SendTelegramMessage } from "@/models";

export const sendTelegramMessageFactory = (
  sendMessage: SendTelegramMessage
) => {
  return async (
    telegramId: number,
    message: string
  ): Promise<{
    message: string;
  }> => {
    return sendMessage(telegramId, message);
  };
};
