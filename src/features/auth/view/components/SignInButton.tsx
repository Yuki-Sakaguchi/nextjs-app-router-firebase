"use client";

import { useSignIn } from "@/features/auth/view/hooks/useSignIn";

export default function SignInButton() {
  const { signIn } = useSignIn();
  return (
    <button
      className="btn btn-secondary"
      type="button"
      onClick={() => signIn()}
    >
      SignIn
    </button>
  );
}
