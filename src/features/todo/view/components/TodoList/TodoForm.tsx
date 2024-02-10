"use client";

import { Todo } from "@/features/todo/domain/model/Todo";
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
    <li>
      <div className="flex gap-2">
        <label>
          <input
            type="checkbox"
            name="enabled"
            className="checkbox"
            defaultChecked={todo.enabled}
            onChange={async () => handleAction(todo)}
          />
        </label>
        <div>{todo.title}</div>
        <time>{todo.createdAt.toString()}</time>
      </div>
    </li>
  );
}
