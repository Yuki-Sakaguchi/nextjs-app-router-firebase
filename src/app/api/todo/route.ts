import { NextResponse } from "next/server";

import type {
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "firebase-admin/firestore";
import type { NextRequest } from "next/server";

import { db } from "@/lib/firebase/server";

const COLLECTION_NAME = "todo";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const month = searchParams.get("month");
  const snapshot: QuerySnapshot = await db
    .collection(COLLECTION_NAME)
    // .where("date", ">=", `${month}-01`)
    // .where("date", "<=", `${month}-31`)
    .get();
  const data = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const insertData = await request.json();
  const docRef = await db.collection(COLLECTION_NAME).add(insertData);
  return NextResponse.json({ ...insertData, id: docRef.id });
}

export async function PATCH(request: NextRequest) {
  const updateData = await request.json();
  db.collection(COLLECTION_NAME).doc(updateData.id).update(updateData);
  return NextResponse.json(updateData);
}
