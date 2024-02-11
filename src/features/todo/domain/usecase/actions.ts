"use server";

import { revalidatePath } from "next/cache";
import { Todo } from "../model/Todo";
import { patchTodo, postTodo } from "./server";

export async function toggleEnabled(todo: Todo) {
  try {
    const response = await patchTodo({
      ...todo,
      enabled: !todo.enabled,
    });
  } catch (e) {
    throw new Error("エラーが発生しました");
  }
  revalidatePath("/todos");
}

export async function addTodo(formData: FormData) {
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  if (title === "") {
    throw new Error("タイトルを入力してください");
  }
  try {
    const response = await postTodo({
      title,
      body,
    });
  } catch (e) {
    throw new Error("エラーが発生しました");
  }
  revalidatePath("/todos");
}
