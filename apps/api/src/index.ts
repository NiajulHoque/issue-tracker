import express, { Request, Response } from "express";
import cors from "cors";
import { json } from "body-parser";

import authRouter from "./routes/auth.routes";
import ENV_CONFIG from "./constants/env-config";
import { connectToDB } from "./constants/db";
import { initialiseTelegramBot } from "./constants/telegraf";

const app = express();
app.use(cors());
app.use(json());

const port = ENV_CONFIG.port || "8080";

// Routes
app.use("/api/auth", authRouter);

app.get("/api/hello", (req: Request, res: Response) => {
  res.json({
    message: "Hello World!",
  });
});

(async () => {
  try {
    await connectToDB();
    initialiseTelegramBot();

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
})();
