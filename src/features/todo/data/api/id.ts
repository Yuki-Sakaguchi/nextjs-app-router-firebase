import { NextRequest, NextResponse } from "next/server";

import { getUser } from "@/features/user/data/api/route";
import { db } from "@/lib/firebase/server";
import { Todo } from "../../domain/model/Todo";
import { todoRawConverter } from "../datasource/TodoRaw";

const COLLECTION_NAME = "todo";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const user = await getUser();
  if (!user) {
    throw new Error("ユーザーが存在しません");
  }
  const id = params.id;
  if (!id) {
    throw new Error("IDが存在しません");
  }
  const documentData = await db
    .collection(COLLECTION_NAME)
    .withConverter(todoRawConverter)
    .doc(id)
    .get();
  if (!documentData.exists) {
    return NextResponse.json({});
  }
  const data = (() => {
    const value = documentData.data();
    return {
      ...value,
      createdAt: value?.createdAt as Date,
      id: documentData.id,
    };
  })();
  return NextResponse.json(data as Todo);
}
