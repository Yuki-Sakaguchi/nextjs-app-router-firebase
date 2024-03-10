import { Todo } from "@/features/todo/domain/model/Todo";
import { getTodo } from "@/features/todo/domain/usecase/server";
import { formatYYYYMMDD } from "@/lib/date";
import Link from "next/link";

type Props = {
  todo: Todo;
};

export default async function TodoDetail({ todo }: Props) {
  return (
    <div className="relative">
      <p>{todo.id}</p>
      <p>{todo.title}</p>
      <p>{todo.body}</p>
      <p>{formatYYYYMMDD(todo.createdAt)}</p>
      <p>{todo.enabled ? "完了" : "未対応"}</p>
      <Link href="/todos">戻る</Link>
    </div>
  );
}
