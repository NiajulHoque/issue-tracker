import { z } from "zod";

const testSchema = z.object({});

export type TestSchema = z.infer<typeof testSchema>;
