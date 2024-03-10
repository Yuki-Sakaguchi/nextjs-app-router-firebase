"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { Todo } from "@/features/todo/domain/model/Todo";
import { formatYYYYMMDD } from "@/lib/date";
import { TrashIcon } from "lucide-react";
import Link from "next/link";

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
      toast({
        title: "Success",
        description: "タスクの編集に成功しました",
      });
    } catch (e) {
      if (e instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: e.message,
        });
      }
    }
  }
  async function handleRemove(id: string) {
    if (confirm("本当に削除してもよろしいでしょうか？")) {
      try {
        await removeTodo(id);
        toast({
          title: "Success",
          description: "タスクの削除に成功しました",
        });
      } catch (e) {
        if (e instanceof Error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: e.message,
          });
        }
      }
    }
  }
  return (
    <li>
      <Link
        href={`/todos/detail/${todo.id}`}
        className="border py-2 px-4 rounded-lg block transition-all hover:bg-slate-200"
      >
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
              <TrashIcon className="h-6 w-6 text-gray-400" />
            </button>
          </div>
        </div>
      </Link>
    </li>
  );
}
