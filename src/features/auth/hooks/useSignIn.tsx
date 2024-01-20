import { useEffect } from "react";

import { getRedirectResult, signInWithRedirect } from "firebase/auth";
import { useRouter } from "next/navigation";

import { postSignIn } from "@/features/auth/api/signIn";
import { auth, provider } from "@/lib/firebase/client";

export function useSignIn() {
  const router = useRouter();

  useEffect(() => {
    getRedirectResult(auth).then(async (userCred) => {
      if (!userCred) return;
      const token = await userCred.user.getIdToken();
      const response = await postSignIn(token);
      if (response.status === 200) router.push("/dashboard");
    });
  }, [router]);

  function signIn() {
    signInWithRedirect(auth, provider);
  }

  return {
    signIn,
  };
}
