"use client";

import { Todo } from "@/features/todo/domain/model/Todo";
import { formatYYYYMMDD } from "@/lib/date";
import toast from "@/lib/toast";

type Props = {
  todo: Todo;
  toggleEnabled: (todo: Todo) => Promise<void>;
};

export default async function TodoForm({ todo, toggleEnabled }: Props) {
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
          <div>
            <time className="badge badge-sm text-xs">
              {formatYYYYMMDD(todo.createdAt)}
            </time>
            <h3 className="text-xl font-bold">{todo.title}</h3>
          </div>
        </div>
      </div>
    </li>
  );
}
