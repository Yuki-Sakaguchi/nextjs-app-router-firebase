function isServer(): boolean {
  return typeof window === "undefined";
}

export async function getApiBase() {
  if (isServer()) {
    const { headers } = await import("next/headers");
    const headersData = headers();
    const host = headersData.get("host");
    const protocol =
      headersData.get("x-forwarded-proto") ?? host?.startsWith("localhost")
        ? "http"
        : "https";
    const apiBase = `${protocol}://${host}`;
    return apiBase;
  }
  return "/";
}

export async function fetchServerAndClient(
  path: string,
  options?: RequestInit,
) {
  let p = path;
  let o = options;
  if (isServer()) {
    const { cookies } = await import("next/headers");
    const { headers } = await import("next/headers");
    const headersData = headers();
    const host = headersData.get("host");
    const protocol =
      headersData.get("x-forwarded-proto") ?? host?.startsWith("localhost")
        ? "http"
        : "https";
    const apiBase = `${protocol}://${host}`;
    const session = cookies().get("session")?.value || "";
    p = apiBase + p;
    o = {
      ...options,
      headers: {
        Cookie: `session=${session}`,
      },
    };
  }
  return await fetch(p, {
    cache: "no-store",
    ...o,
  });
}
