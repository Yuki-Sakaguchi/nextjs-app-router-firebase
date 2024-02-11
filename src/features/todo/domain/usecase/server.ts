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

export async function postTodo(params: {
  title: string;
  body: string;
}): Promise<Todo> {
  const apiBase = getApiBase();
  const response = await fetch(`${apiBase}/api/todo`, {
    method: "POST",
    body: JSON.stringify(params),
  });
  if (!response.ok) {
    throw new Error("error");
  }
  const data = await response.json();
  return data as Todo;
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

export async function deleteTodo(id: string): Promise<void> {
  const apibase = getApiBase();
  const response = await fetch(`${apibase}/api/todo`, {
    method: "DELETE",
    body: JSON.stringify(id),
  });
  if (!response.ok) {
    throw new Error("error");
  }
}
