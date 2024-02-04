import "server-only";

import { Todo } from "@/features/todo/domain/model/Todo";
import { isEmptyObject } from "@/utils/check";
import { getApiBase } from "@/utils/fetch";

export async function getTodos(): Promise<Todo[]> {
  const apiBase = getApiBase();
  const response = await fetch(`${apiBase}/api/todo`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("error");
  }
  const data = await response.json();
  if (isEmptyObject(data)) {
    return [];
  }
  return data as Todo[];
}

export async function patchTodo(todo: Todo): Promise<Todo> {
  const apiBase = getApiBase();
  const response = await fetch(`${apiBase}/api/todo`, {
    method: "PATCH",
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error("error");
  }
  const data = await response.json();
  return data as Todo;
}
