import { z } from "zod";

export const todoSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  enabled: z.boolean(),
  createdAt: z.date(),
});

export type Todo = z.infer<typeof todoSchema>;
