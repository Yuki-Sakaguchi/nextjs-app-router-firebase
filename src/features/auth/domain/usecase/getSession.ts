import { cookies } from "next/headers";

import { auth, customInitApp } from "@/lib/firebase/server";

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
