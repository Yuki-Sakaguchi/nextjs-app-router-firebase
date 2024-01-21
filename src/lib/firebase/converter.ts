import { z } from "zod";

import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";

import { FieldValue, Timestamp } from "firebase-admin/firestore";

export const converter = <T extends z.AnyZodObject>(
  schema: T,
): FirestoreDataConverter<z.infer<T>> => ({
  toFirestore: (data: z.infer<T>): DocumentData => {
    return schema.strict().parse(data);
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<z.infer<T>>): z.infer<T> => {
    return schema.strict().parse(snapshot.data());
  },
});

const firestoreFieldValueSchema = z.custom<FieldValue>(
  (value) => value instanceof FieldValue,
);

export const firestoreTimestampSchema = z.custom<Timestamp>(
  (value) => value instanceof Timestamp,
);

export const firestoreFieldValueOrTimestampSchema = z.union([
  firestoreFieldValueSchema,
  firestoreTimestampSchema,
]);
