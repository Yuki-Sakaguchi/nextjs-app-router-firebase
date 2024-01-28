import { converter, firestoreTimestampSchema } from "@/lib/firebase/converter";
import { z } from "zod";

export const todoRawSchema = z.object({
  title: z.string(),
  body: z.string(),
  enabled: z.boolean(),
  createdAt: firestoreTimestampSchema,
});

export type TodoRaw = z.infer<typeof todoRawSchema>;
export const todoRawConverter = converter(todoRawSchema);