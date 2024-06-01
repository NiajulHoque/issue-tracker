import dotenv from "dotenv";

dotenv.config();

const ENV_CONFIG = {
  port: process.env.PORT as string,
} as const;

export default ENV_CONFIG;
