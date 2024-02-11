"use client";

import { Todo } from "@/features/todo/domain/model/Todo";
import { formatYYYYMMDD } from "@/lib/date";
import toast from "@/lib/toast";
import { TrashIcon } from "@heroicons/react/24/outline";

type Props = {
  todo: Todo;
  toggleEnabled: (todo: Todo) => Promise<void>;
  removeTodo: (id: string) => Promise<void>;
};

export default async function TodoForm({
  todo,
  toggleEnabled,
  removeTodo,
}: Props) {
  async function handleAction(todo: Todo) {
    try {
      await toggleEnabled(todo);
      toast.success("タスクの編集に成功しました");
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  }
  async function handleRemove(id: string) {
    try {
      await removeTodo(id);
      toast.success("タスクの削除に成功しました");
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  }
  return (
    <li className="card border">
      <div className="card-body">
        <div className="flex items-center gap-4">
          <label className="block">
            <input
              type="checkbox"
              name="enabled"
              className="checkbox"
              defaultChecked={todo.enabled}
              onChange={async () => handleAction(todo)}
            />
          </label>
          <div className="flex-1">
            <time className="badge badge-sm text-xs">
              {formatYYYYMMDD(todo.createdAt)}
            </time>
            <h3 className="text-xl font-bold">{todo.title}</h3>
          </div>
          <div>
            <button type="button" onClick={() => handleRemove(todo.id)}>
              <TrashIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
