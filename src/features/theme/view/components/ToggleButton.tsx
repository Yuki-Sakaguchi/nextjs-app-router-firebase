"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { setTheme } from "../../domain/usecase/client";

type Props = {
  defaultTheme: string;
};

export default function ThemeToggleButton({ defaultTheme }: Props) {
  const [checked, setChecked] = useState(defaultTheme === "dark");

  useEffect(() => {
    const theme = checked ? "dark" : "emerald";
    setTheme(theme);
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [checked]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const checked = e.currentTarget.checked;
    setChecked(checked);
  }

  return (
    <input
      type="checkbox"
      className="toggle"
      checked={checked}
      onChange={handleChange}
    />
  );
}
