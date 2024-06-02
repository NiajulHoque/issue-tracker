import { Telegraf } from "telegraf";
import ENV_CONFIG from "./env-config";

export const bot = new Telegraf(ENV_CONFIG.telegramBotToken);

export const initialiseTelegramBot = () => {
  bot.start((ctx) => ctx.reply("Hello, I am the Issue Tracker Telegram bot."));
  bot.launch();
  console.debug("Telegram bot running...");

  // Enable graceful stop
  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
};
