import { cookies } from "next/headers";

export async function logout() {
  const token = cookies().get("session");
  await fetch("http:/localhost:3000/api/auth", {
    method: "DELETE",
    headers: {
      Cookie: `session=${token?.value}`,
    },
  });
  cookies().delete("session");
}
