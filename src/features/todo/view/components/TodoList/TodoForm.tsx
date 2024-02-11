"use client";

import { Checkbox } from "@/components/ui/checkbox";
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
    console.log("change", todo);
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
    <li className="border py-2 px-4 rounded-md">
      <div>
        <div className="flex items-center gap-4">
          <Checkbox
            name="enabled"
            defaultChecked={todo.enabled}
            onCheckedChange={async () => handleAction(todo)}
          />
          <div className="flex-1">
            <time className="text-xs">{formatYYYYMMDD(todo.createdAt)}</time>
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
