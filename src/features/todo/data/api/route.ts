import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/firebase/server";
import { Todo } from "../../domain/model/Todo";
import { todoRawConverter } from "../datasource/TodoRaw";

const COLLECTION_NAME = "todo";

export async function GET(request: NextRequest) {
  // const { searchParams } = new URL(request.url);
  // const month = searchParams.get("month");
  const snapshot = await db
    .collection(COLLECTION_NAME)
    // .where("date", ">=", `${month}-01`)
    // .where("date", "<=", `${month}-31`)
    .withConverter(todoRawConverter)
    .get();
  if (snapshot.empty) {
    return NextResponse.json({});
  }
  const data: Todo[] = snapshot.docs.map((doc) => {
    const value = doc.data();
    return {
      ...value,
      createdAt: new Date(value.createdAt.seconds * 1000),
      id: doc.id,
    };
  });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const insertData = await request.json();
  const docRef = await db.collection(COLLECTION_NAME).add(insertData);
  return NextResponse.json({ ...insertData, id: docRef.id });
}

export async function PATCH(request: NextRequest) {
  const updateData = await request.json();
  db.collection(COLLECTION_NAME).doc(updateData.id).update({
    enabled: updateData.enabled,
  });
  return NextResponse.json(updateData);
}
