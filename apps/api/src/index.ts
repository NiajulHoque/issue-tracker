import express, { Request, Response } from "express";
import cors from "cors";
import { json } from "body-parser";

import authRouter from "./routes/auth.routes";
import ENV_CONFIG from "./constants/env-config";

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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
