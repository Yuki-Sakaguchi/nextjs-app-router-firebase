import { getTodos } from "@/features/todo/domain/usecase/server";
import TodoListPresenter from "./Presenter";

export default async function TodoListContainer() {
  const todos = await getTodos();
  if (todos.length === 0) {
    return <div>タスクがありません</div>;
  }
  return <TodoListPresenter todos={todos} />;
}
