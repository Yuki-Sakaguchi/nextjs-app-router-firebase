import { NextRequest, NextResponse } from "next/server";

import { getUser, getUserUid } from "@/features/user/data/api/route";
import { db } from "@/lib/firebase/server";
import { Todo } from "../../domain/model/Todo";
import { todoRawConverter } from "../datasource/TodoRaw";

const COLLECTION_NAME = "todo";

export async function GET(request: NextRequest) {
  const uid = await getUserUid();
  if (!uid) {
    throw new Error("ユーザーが存在しません");
  }
  const snapshot = await db
    .collection(COLLECTION_NAME)
    .withConverter(todoRawConverter)
    .where("userId", "==", uid)
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
  return NextResponse.json(
    data.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)),
  );
}

export async function POST(request: NextRequest) {
  const uid = await getUserUid();
  if (!uid) {
    throw new Error("ユーザーが存在しません");
  }
  const insertData = await request.json();
  const newTodo: Omit<Todo, "id"> = {
    title: insertData.title,
    body: insertData.body,
    createdAt: new Date(),
    enabled: false,
    userId: uid,
  };
  await db
    .collection(COLLECTION_NAME)
    .withConverter(todoRawConverter)
    .add(newTodo);
  return NextResponse.json(newTodo);
}

export async function PATCH(request: NextRequest) {
  const uid = await getUserUid();
  if (!uid) {
    throw new Error("ユーザーが存在しません");
  }
  const updateData: Todo = await request.json();
  const id = updateData.id;
  const newTodo: Omit<Todo, "id"> = {
    title: updateData.title,
    body: updateData.body,
    createdAt: new Date(updateData.createdAt),
    enabled: updateData.enabled,
    userId: uid,
  };
  await db
    .collection(COLLECTION_NAME)
    .doc(id)
    .withConverter(todoRawConverter)
    .update(newTodo);
  return NextResponse.json(updateData);
}

export async function DELETE(request: NextRequest) {
  const uid = await getUserUid();
  if (!uid) {
    throw new Error("ユーザーが存在しません");
  }
  const deleteData = await request.json();

  const doc = await db
    .collection(COLLECTION_NAME)
    .doc(deleteData)
    .withConverter(todoRawConverter)
    .get();

  if (!doc.exists) {
    return NextResponse.json({ message: "failure" });
  }

  if (doc.data()?.userId !== uid) {
    return NextResponse.json({ message: "failure" });
  }

  doc.ref.delete();
  return NextResponse.json({ message: "success" });
}
