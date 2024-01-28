import { getTheme } from "../../domain/usecase/server";
import ThemeToggleButton from "./ToggleButton";

export default function Theme() {
  const theme = getTheme();
  return <ThemeToggleButton defaultTheme={theme} />;
}
