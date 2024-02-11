import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogoutButton from "@/features/auth/view/components/LogoutButton";
import SignInButton from "@/features/auth/view/components/SignInButton";
import { getUser } from "@/features/user/domain/usecase/server";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default async function SideMenu() {
  const user = await getUser();
  return (
    <div className="w-full h-full bg-primary text-primary-foreground">
      <div className="py-8">
        {user ? (
          <div className="flex justify-center items-center flex-col">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="w-14 h-14">
                  <AvatarImage src={user.avater} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>
                  {/* @ts-expect-error Server Component */}
                  <LogoutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex justify-center">
            <SignInButton />
          </div>
        )}
        <div className="mt-5">
          <ul className="mt-4 px-6 flex flex-col gap-2">
            <li>
              <Link className="" href="/">
                HOME
              </Link>
            </li>
            <li>
              <Link className="" href="/todos">
                タスク一覧
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
