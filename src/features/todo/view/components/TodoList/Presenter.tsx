import { Todo } from "../../../domain/model/Todo";
import { toggleEnabled } from "../../../domain/usecase/actions";
import TodoForm from "./TodoForm";

type Props = {
  todos: Todo[];
};

export default function TodoListPresenter({ todos }: Props) {
  return (
    <ul className="flex flex-col gap-4">
      {todos.map((todo) => (
        <TodoForm todo={todo} key={todo.id} toggleEnabled={toggleEnabled} />
      ))}
    </ul>
  );
}
