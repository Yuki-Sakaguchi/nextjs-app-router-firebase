"use client";

import { type ChangeEvent, useState } from "react";
import { Todo } from "../../../domain/model/Todo";

type Props = {
  todos: Todo[];
};

function TodoListItem({ todo }: { todo: Todo }) {
  const [checked, setChecked] = useState(todo.enabled);
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setChecked(event.currentTarget.checked);
  }
  return (
    <li className="flex gap-2" key={todo.id}>
      <label>
        <input
          type="checkbox"
          className="checkbox"
          checked={checked}
          onChange={handleChange}
        />
      </label>
      <div>{todo.title}</div>
    </li>
  );
}

export default function TodoListPresenter({ todos }: Props) {
  return (
    <ul className="flex flex-col gap-4">
      {todos.map((todo) => (
        <TodoListItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
}
