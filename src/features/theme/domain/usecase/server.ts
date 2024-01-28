import { cookies } from "next/headers";
import { Theme } from "../../types";

export function getTheme(): Theme {
  return (cookies().get("theme")?.value as Theme) ?? "emerald";
}
