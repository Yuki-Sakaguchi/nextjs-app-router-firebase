import { Todo } from "@/features/todo/domain/model/Todo";
import { isEmptyObject } from "@/utils/check";
import { fetchServerAndClient } from "@/utils/fetch";

export function isServer(): boolean {
  return typeof window === "undefined";
}

export async function getTodo(id: string): Promise<Todo | null> {
  const path = `/api/todo/${id}`;

  const response = await fetchServerAndClient(path);

  if (!response.ok) {
    throw new Error("error");
  }
  const data = await response.json();
  if (isEmptyObject(data)) {
    return null;
  }
  return data as Todo;
}

export async function getTodos(): Promise<Todo[]> {
  const path = "/api/todo";

  const response = await fetchServerAndClient(path);

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
  const path = "/api/todo";
  const response = await fetchServerAndClient(path, {
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
  const path = "/api/todo";
  const response = await fetchServerAndClient(path, {
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
  const path = "/api/todo";
  const response = await fetchServerAndClient(path, {
    method: "DELETE",
    body: JSON.stringify(id),
  });
  if (!response.ok) {
    throw new Error("error");
  }
}
