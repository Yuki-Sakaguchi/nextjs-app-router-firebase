import { Todo } from "@/features/todo/domain/model/Todo";
import { getApiBase } from "@/utils/fetch";

export async function getTodos(): Promise<Todo[]> {
  const apiBase = getApiBase();
  const response = await fetch(`${apiBase}/api/todo`);
  if (!response.ok) {
    throw new Error("error");
  }
  const data: Todo[] = await response.json();
  return data;
}
