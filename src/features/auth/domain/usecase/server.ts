import "server-only";

import { auth, customInitApp } from "@/lib/firebase/server";
import { getApiBase } from "@/utils/fetch";
import { cookies } from "next/headers";

customInitApp();

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) {
    return null;
  }
  try {
    const user = await auth.verifySessionCookie(session, true);
    return user;
  } catch (e) {
    return null;
  }
}

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
