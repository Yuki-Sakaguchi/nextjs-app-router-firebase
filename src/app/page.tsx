import LogoutButton from "@/features/auth/view/components/LogoutButton";
import SignInButton from "@/features/auth/view/components/SignInButton";
import TodoList from "@/features/todo/view/components/TodoList";
import UserData from "@/features/user/view/components/UserData";

export default async function Home() {
  return (
    <div>
      <UserData />
      <TodoList />
      <SignInButton />
      <LogoutButton />
    </div>
  );
}
