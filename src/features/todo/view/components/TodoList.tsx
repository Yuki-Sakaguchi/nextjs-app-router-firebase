import { getTodos } from "@/features/todo/domain/usecase/getTodos";
import { format } from "date-fns";

export default async function TodoList() {
  const todos = await getTodos();
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.title} {format(new Date(), "yyyy-MM-dd")}
        </li>
      ))}
    </ul>
  );
}
