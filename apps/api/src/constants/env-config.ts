import dotenv from "dotenv";

dotenv.config();

const ENV_CONFIG = {
  port: process.env.PORT as string,
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN as string,
} as const;

export default ENV_CONFIG;
