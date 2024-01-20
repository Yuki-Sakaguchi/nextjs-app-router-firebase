'use client';

import { useSignIn } from '@/features/auth/hooks/useSignIn';

export default function SignInButton() {
  const { signIn } = useSignIn();
  return <button onClick={() => signIn()}>SignIn</button>;
}
