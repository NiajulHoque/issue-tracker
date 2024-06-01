import express, { Request, Response } from "express";

// /api/auth
const router = express.Router();

router.post("/create-account", async (req: Request, res: Response) => {
  const result = await createAccount(req.body);
  return res.json(result);
});

export default router;
