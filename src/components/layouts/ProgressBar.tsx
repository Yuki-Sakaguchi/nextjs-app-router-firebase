"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function Providers() {
  return (
    <>
      <ProgressBar
        height="4px"
        color="#48CFAE"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
}
