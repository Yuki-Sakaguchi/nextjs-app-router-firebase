import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { addTodo } from "@/features/todo/domain/usecase/actions";
import { getTodo } from "@/features/todo/domain/usecase/server";
import { TodoList } from "@/features/todo/view/components";
import AddButton from "@/features/todo/view/components/AddButton";
import TodoDetail from "@/features/todo/view/components/TodoDetail";

type Props = {
  params: { id: string };
};

export default async function TodoDetailPage({ params }: Props) {
  const todo = await getTodo(params.id);
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={50} minSize={25}>
        <div className="p-8">
          <div className="flex items-center gap-4">
            <h1 className="text-4x font-bold">TODO一覧</h1>
            <AddButton addTodo={addTodo} />
          </div>
          <div className="mt-8">
            <TodoList />
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50} minSize={25}>
        <div className="p-8">{todo != null && <TodoDetail todo={todo} />}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
