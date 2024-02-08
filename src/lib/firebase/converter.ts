import { z } from "zod";

import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";

import { Timestamp } from "firebase-admin/firestore";

export const converter = <T extends z.AnyZodObject>(
  schema: T,
): FirestoreDataConverter<z.infer<T>> => ({
  toFirestore: (data: z.infer<T>): DocumentData => {
    const parsedData: DocumentData = {};
    for (const [key, value] of Object.entries(data)) {
      if (value instanceof Date) {
        parsedData[key] = Timestamp.fromDate(value);
      } else {
        parsedData[key] = value;
      }
    }
    const sanitisedData = schema.strict().parse(parsedData);
    return sanitisedData;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<z.infer<T>>): z.infer<T> => {
    const result: DocumentData = {};
    const data = snapshot.data();
    for (const key of Object.keys(data)) {
      if (data[key] instanceof Timestamp) {
        result[key] = data[key].toDate();
      } else {
        result[key] = data[key];
      }
    }
    return schema.strict().parse(result);
  },
});

const dateSchema = z.custom<Date>((value) => value instanceof Date);

export const firestoreTimestampSchema = z.custom<Timestamp>(
  (value) => value instanceof Timestamp,
);

export const firestoreTimestampOrDateSchema = z.union([
  firestoreTimestampSchema,
  dateSchema,
]);
