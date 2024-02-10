"use server";

import { revalidatePath } from "next/cache";
import { Todo } from "../model/Todo";
import { patchTodo } from "./server";

export async function toggleEnabled(todo: Todo) {
  try {
    const response = await patchTodo({
      ...todo,
      enabled: !todo.enabled,
    });
  } catch (e) {
    throw new Error("エラーが発生しました");
  }
  revalidatePath("/tasks");
}
