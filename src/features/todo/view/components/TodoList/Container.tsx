import { getTodos } from "@/features/todo/domain/usecase/server";
import TodoListPresenter from "./Presenter";

export default async function TodoListContainer() {
  const todos = await getTodos();
  return <TodoListPresenter todos={todos} />;
}
