"use client";

import { getTodos } from "@/features/todo/domain/usecase/server";
import { useEffect, useState } from "react";
import { Todo } from "../../../domain/model/Todo";
import { removeTodo, toggleEnabled } from "../../../domain/usecase/actions";
import TodoForm from "./TodoForm";

type Props = {
  todos: Todo[];
};

export default function TodoListPresenter({ todos }: Props) {
  const [todoList, setTodoList] = useState<Todo[]>();
  console.log("server todos", todos);
  useEffect(() => {
    (async () => {
      const todos = await getTodos();
      console.log("client todos", todos);
      setTodoList(todos);
    })();
  }, []);
  useEffect(() => {
    console.log("client todos -> client state", todoList);
  }, [todoList]);
  // console.log("server todos -> client state", todoList); //これがずっと古いままなのでおかしい
  return (
    <ul className="flex flex-col gap-4">
      {todos.map((todo) => (
        <TodoForm
          todo={todo}
          key={todo.id}
          toggleEnabled={toggleEnabled}
          removeTodo={removeTodo}
        />
      ))}
    </ul>
  );
}
