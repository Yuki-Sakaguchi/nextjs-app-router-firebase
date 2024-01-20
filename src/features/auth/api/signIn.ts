export function postSignIn(token: string) {
  return fetch("/api/auth", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
