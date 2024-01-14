import { getTodos } from "@/features/todo/api/getTodos";

export default async function TodoList() {
  const todos = await getTodos();
  return <ul>{todos && todos.map((value: any) => <li>{value.title}</li>)}</ul>;
}
