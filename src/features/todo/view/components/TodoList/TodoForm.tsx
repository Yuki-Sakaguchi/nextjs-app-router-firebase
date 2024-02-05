"use client";

import { Todo } from "@/features/todo/domain/model/Todo";

type Props = {
  todo: Todo;
  toggleEnabled: (todo: Todo) => Promise<void>;
};

export default async function TodoForm({ todo, toggleEnabled }: Props) {
  return (
    <li>
      <div className="flex gap-2">
        <label>
          <input
            type="checkbox"
            name="enabled"
            className="checkbox"
            defaultChecked={todo.enabled}
            onChange={() => toggleEnabled(todo)}
          />
        </label>
        <div>{todo.title}</div>
      </div>
    </li>
  );
}
