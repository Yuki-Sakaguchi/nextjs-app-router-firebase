import { logout } from "@/features/auth/api/logout";
import { redirect } from "next/navigation";

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
