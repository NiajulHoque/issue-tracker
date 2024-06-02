import { bot } from "@/constants/telegraf";
import { SendTelegramMessage } from "@/models";

export const sendTelegrafMessage: SendTelegramMessage = async (
  telegramId: number,
  message: string
): Promise<{
  message: string;
}> => {
  await bot.telegram.sendMessage(telegramId, message);

  return {
    message: "Telegram message sent.",
  };
};
