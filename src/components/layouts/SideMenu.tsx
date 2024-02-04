import LogoutButton from "@/features/auth/view/components/LogoutButton";
import SignInButton from "@/features/auth/view/components/SignInButton";
import { getTodos } from "@/features/todo/domain/usecase/server";
import { getUser } from "@/features/user/domain/usecase/server";
import Link from "next/link";

export default async function SideMenu() {
  const user = await getUser();
  const todos = await getTodos();
  return (
    <div className="w-[200px] bg-neutral text-neutral-content">
      <div className="py-8">
        {user ? (
          <div className="flex justify-center items-center flex-col">
            <div className="dropdown dropdown-right">
              <div tabIndex={0} role="button" className="avatar">
                <div className="w-20 rounded-full">
                  <img src={user.avater} alt="" />
                </div>
              </div>
              <ul className="ml-4 dropdown-content z-[1] menu p-2 shadow bg-base-100 text-neutral rounded-box w-52">
                <li>
                  <LogoutButton />
                </li>
              </ul>
            </div>
            <p>{user.lastName}</p>
          </div>
        ) : (
          <div className="flex justify-center">
            <SignInButton />
          </div>
        )}
        <div className="mt-5">
          <ul className="menu bg-base-content rounded-box">
            <li>
              <Link className="hover:bg-slate-800" href="/tasks">
                タスク一覧
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
