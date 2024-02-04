import { TodoList } from "@/features/todo/view/components";

export default async function Tasks() {
  return (
    <div>
      <h1 className="text-4x font-bold">タスク一覧</h1>
      <div className="mt-8">
        <TodoList />
      </div>
    </div>
  );
}
