import UserData from "@/features/auth/components/UserData";
import TodoList from "@/features/todo/components/TodoList";
import LogoutButton from "@/features/auth/components/LogoutButton";
import SignInButton from "@/features/auth/components/SignInButton";

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
