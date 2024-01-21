import { converter, firestoreTimestampSchema } from "@/lib/firebase/converter";
import { z } from "zod";

export const userRawSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  avater: z.string(),
  enabled: z.boolean(),
  createdAt: firestoreTimestampSchema,
});

export type UserRaw = z.infer<typeof userRawSchema>;
export const userRawConverter = converter(userRawSchema);
