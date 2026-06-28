"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ILoginData } from "./types.login";
import { LoginUser } from "@/src/lib/store/auth/authSlice";
import { isInstituteUser } from "@/src/lib/store/auth/types.authSlice";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hooks";
import { Status } from "@/src/lib/types/types";
import MaterialIcon from "@/src/lib/coponents/material-icon";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const status = useAppSelector((state) => state.auth.status);
  const user = useAppSelector((state) => state.auth.user);
  const [data, setData] = useState<ILoginData>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (status === Status.SUCCESS && user.token) {
      router.push(
        isInstituteUser(user) ? "/institute/dashboard" : "/dashboard",
      );
    }
  }, [status, user, router]);

  const handleLoginData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(LoginUser(data));
  };

  return (
    <>
      <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="bg-white shadow-md rounded-md p-6">
            <MaterialIcon
              name="accountCircle"
              className="mx-auto h-12 w-12 text-sky-500"
            />
            <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={data.email}
                    onChange={handleLoginData}
                    required
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 text-black shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={data.password}
                    onChange={handleLoginData}
                    required
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 text-black shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  />
                </div>
              </div>

              {status === Status.ERROR && (
                <p className="text-sm text-red-600">
                  Login failed. Check your email and password.
                </p>
              )}

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
