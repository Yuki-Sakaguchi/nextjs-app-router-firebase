import Cookies from "js-cookie";
import { Theme } from "../../types";

export function setTheme(theme: Theme) {
  return Cookies.set("theme", theme);
}
