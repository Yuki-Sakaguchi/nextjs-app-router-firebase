"use client";

import { useSignIn } from "@/features/auth/hooks/useSignIn";

export default function SignInButton() {
  const { signIn } = useSignIn();
  return (
    <button type="button" onClick={() => signIn()}>
      SignIn
    </button>
  );
}
