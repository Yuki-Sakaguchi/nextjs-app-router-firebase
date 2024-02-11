import { Todo } from "../../../domain/model/Todo";
import { removeTodo, toggleEnabled } from "../../../domain/usecase/actions";
import TodoForm from "./TodoForm";

type Props = {
  todos: Todo[];
};

export default function TodoListPresenter({ todos }: Props) {
  return (
    <ul className="flex flex-col gap-4">
      {todos.map((todo) => (
        <>
          {/* @ts-expect-error Server Component */}
          <TodoForm
            todo={todo}
            key={todo.id}
            toggleEnabled={toggleEnabled}
            removeTodo={removeTodo}
          />
        </>
      ))}
    </ul>
  );
}
