"use server";

import { revalidatePath } from "next/cache";
import { Todo } from "../model/Todo";
import { patchTodo } from "./server";

export async function toggleEnabled(todo: Todo) {
  const response = await patchTodo({
    ...todo,
    enabled: !todo.enabled,
  });
  revalidatePath("/tasks");
}
