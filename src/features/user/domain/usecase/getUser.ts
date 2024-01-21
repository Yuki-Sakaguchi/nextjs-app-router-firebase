import { customInitApp } from "@/lib/firebase/server";
import { getApiBase } from "@/utils/fetch";
import { cookies } from "next/headers";
import { User } from "../model/User";

customInitApp();

export async function getUser() {
  const apiBase = getApiBase();
  const session = cookies().get("session")?.value || "";
  const response = await fetch(`${apiBase}/api/user`, {
    headers: {
      Cookie: `session=${session}`,
    },
  });
  if (!response.ok) {
    return null;
  }
  const data: User = await response.json();
  return data;
}
