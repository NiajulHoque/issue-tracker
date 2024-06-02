import express, { Request, Response } from "express";
import { z } from "zod";

import { getZodErrorMessage } from "@repo/data-commons";
import {
  CreateAccountEndpointSchema,
  createAccountEndpointSchema,
  validateCreateAccountEndpointData,
} from "@/models";
import { createAccount, sendTelegramMessage } from "@/services";

// /api/auth
const router = express.Router();

router.post("/create-account", async (req: Request, res: Response) => {
  const validatedData = validateCreateAccountEndpointData(req.body);
  if (!validatedData.success) {
    return res.status(400).json({
      message: validatedData.error,
    });
  }

  const result = await createAccount(validatedData.value);

  return res.status(201).json(result);
});

export default router;
