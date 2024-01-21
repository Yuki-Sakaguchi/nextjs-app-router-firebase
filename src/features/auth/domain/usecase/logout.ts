import { getApiBase } from "@/utils/fetch";
import { cookies } from "next/headers";

export async function logout() {
  const token = cookies().get("session");
  const apiBase = getApiBase();
  await fetch(`${apiBase}/api/auth`, {
    method: "DELETE",
    headers: {
      Cookie: `session=${token?.value}`,
    },
  });
  cookies().delete("session");
}
