import { redirect } from "next/navigation";

import { logout } from "@/features/auth/api/logout";

export default async function LogoutButton() {
  async function handleAction() {
    "use server";
    await logout();
    redirect("/");
  }
  return (
    <form action={handleAction}>
      <button type="submit">Logout</button>
    </form>
  );
}
