"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hydrateAuthFromStorage } from "@/src/lib/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const token = useAppSelector((state) => state.auth.user.token);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void dispatch(hydrateAuthFromStorage()).finally(() => {
      setReady(true);
    });
  }, [dispatch]);

  useEffect(() => {
    if (!ready) return;

    if (!token) {
      router.replace("/auth/login");
    }
  }, [ready, token, router]);

  if (!ready || !token) {
    return null;
  }

  return <>{children}</>;
}
