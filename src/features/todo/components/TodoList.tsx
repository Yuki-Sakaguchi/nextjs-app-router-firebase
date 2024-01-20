import { getTodos } from "@/features/todo/api/getTodos";

type Todo = {
  title: string;
  body: string;
};

export default async function TodoList() {
  const todos: Todo[] = await getTodos();
  return (
    <ul>
      {todos.map((value) => (
        <li key={value.title}>{value.title}</li>
      ))}
    </ul>
  );
}
