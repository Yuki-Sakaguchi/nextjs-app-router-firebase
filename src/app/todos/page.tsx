import { addTodo } from "@/features/todo/domain/usecase/actions";
import { TodoList } from "@/features/todo/view/components";
import AddButton from "@/features/todo/view/components/AddButton";

export default async function Todos() {
  return (
    <div>
      <div className="flex items-center gap-4">
        <h1 className="text-4x font-bold">TODO一覧</h1>
        <AddButton addTodo={addTodo} />
      </div>
      <div className="mt-8">
        <TodoList />
      </div>
    </div>
  );
}
