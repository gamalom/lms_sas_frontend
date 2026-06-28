"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/src/lib/store/auth/authSlice";
import { isInstituteUser } from "@/src/lib/store/auth/types.authSlice";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks";

type DashboardHeaderProps = {
  showRegisterAsInstitute?: boolean;
};

export default function DashboardHeader({
  showRegisterAsInstitute = false,
}: DashboardHeaderProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const alreadyInstitute = isInstituteUser(user);

  function handleLogout() {
    dispatch(logoutUser());
    router.push("/auth/login");
  }

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
      <div>
        <p className="text-sm text-gray-500">Welcome back</p>
        <p className="text-base font-semibold text-gray-900">
          {user.username || (alreadyInstitute ? "Institute Admin" : "Student")}
        </p>
      </div>
      <div className="flex items-center gap-3">
        {showRegisterAsInstitute && !alreadyInstitute && (
          <Link
            href="/institute/create"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Register as Institute
          </Link>
        )}
        {alreadyInstitute && (
          <Link
            href="/institute/dashboard"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Institute Dashboard
          </Link>
        )}
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
