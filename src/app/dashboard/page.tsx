"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isInstituteUser } from "@/src/lib/store/auth/types.authSlice";
import { useAppSelector } from "@/src/lib/store/hooks";

export default function StudentDashboardRedirect() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (isInstituteUser(user)) {
      router.replace("/institute/dashboard");
    }
  }, [user, router]);

  if (isInstituteUser(user)) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-gray-900">Student Dashboard</h1>
      <p className="text-gray-600">
        You are logged in as a student. When you are ready to manage your own
        institute, use <strong>Register as Institute</strong> at the top.
      </p>
    </div>
  );
}
