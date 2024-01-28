import LogoutButton from "@/features/auth/view/components/LogoutButton";
import SignInButton from "@/features/auth/view/components/SignInButton";
import Theme from "@/features/theme/view/components";
import TodoList from "@/features/todo/view/components/TodoList";
import { getUser } from "@/features/user/domain/usecase/server";
import UserData from "@/features/user/view/components/UserData";
import Link from "next/link";

export default async function Home() {
  const user = await getUser();
  return (
    <div>
      <UserData />
      <TodoList />
      {user ? (
        <>
          <LogoutButton />
          <Link className="btn btn-info mt-4" href="/dashboard">
            ダッシュボード
          </Link>
        </>
      ) : (
        <SignInButton />
      )}
      <Theme />
    </div>
  );
}
