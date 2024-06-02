export type SendTelegramMessage = (
  telegramId: number,
  message: string
) => Promise<{
  message: string;
}>;
