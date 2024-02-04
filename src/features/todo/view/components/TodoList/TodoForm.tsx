import { Todo } from "@/features/todo/domain/model/Todo";
import { patchTodo } from "@/features/todo/domain/usecase/server";

export default async function TodoForm({ todo }: { todo: Todo }) {
  async function handleAction(formData: FormData) {
    "use server";
    const response = await patchTodo({
      ...todo,
      enabled: Boolean(formData.get("enabled") as string),
    });
  }
  return (
    <li>
      <form action={handleAction}>
        <div className="flex gap-2">
          <label>
            <input
              type="checkbox"
              name="enabled"
              className="checkbox"
              defaultChecked={todo.enabled}
            />
          </label>
          <div>{todo.title}</div>
          <button type="submit">反映</button>
        </div>
      </form>
    </li>
  );
}
