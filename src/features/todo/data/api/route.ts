import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/firebase/server";
import { Todo } from "../../domain/model/Todo";
import { todoRawConverter } from "../datasource/TodoRaw";

const COLLECTION_NAME = "todo";

export async function GET(request: NextRequest) {
  const snapshot = await db
    .collection(COLLECTION_NAME)
    .withConverter(todoRawConverter)
    .get();
  if (snapshot.empty) {
    return NextResponse.json({});
  }
  const data: Todo[] = snapshot.docs.map((doc) => {
    const value = doc.data();
    return {
      ...value,
      createdAt: value.createdAt as Date,
      id: doc.id,
    };
  });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const insertData = await request.json();
  const newTodo: Omit<Todo, "id"> = {
    title: insertData.title,
    body: insertData.body,
    createdAt: new Date(),
    enabled: false,
  };
  await db
    .collection(COLLECTION_NAME)
    .withConverter(todoRawConverter)
    .add(newTodo);
  return NextResponse.json(newTodo);
}

export async function PATCH(request: NextRequest) {
  const updateData: Todo = await request.json();
  const id = updateData.id;
  const newTodo: Omit<Todo, "id"> = {
    title: updateData.title,
    body: updateData.body,
    createdAt: new Date(updateData.createdAt),
    enabled: updateData.enabled,
  };
  await db
    .collection(COLLECTION_NAME)
    .doc(id)
    .withConverter(todoRawConverter)
    .update(newTodo);
  return NextResponse.json(updateData);
}
