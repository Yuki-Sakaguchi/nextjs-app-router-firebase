import { z } from "zod";

export const userSchema = z.object({
  uid: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  avater: z.string(),
  enabled: z.boolean(),
  createdAt: z.date(),
});

export type User = z.infer<typeof userSchema>;
