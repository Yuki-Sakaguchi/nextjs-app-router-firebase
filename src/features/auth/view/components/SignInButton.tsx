"use client";

import { Button } from "@/components/ui/button";
import { useSignIn } from "@/features/auth/view/hooks/useSignIn";

export default function SignInButton() {
  const { signIn } = useSignIn();
  return (
    <Button variant="secondary" type="button" onClick={() => signIn()}>
      SignIn
    </Button>
  );
}
