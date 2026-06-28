"use client";

import Sidebar from "./sidebar";
import MaterialIcon from "../material-icon";
import Image from "next/image";
import DashboardHeader from "./dashboard-header";
import { useAppSelector } from "@/src/lib/store/hooks";

function DashboardComponent({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const username = useAppSelector((state) => state.auth.user.username);

  return (
    <div className="flex h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1 overflow-hidden">
        <aside className="flex w-64 flex-col bg-white shadow-md">
          <div className="border-b p-4">
            <div className="flex items-center">
              <MaterialIcon
                name="trackChanges"
                className="h-8 w-8 text-gray-800"
              />
              <span className="ml-2 text-xl font-semibold text-gray-800">
                Institute
              </span>
            </div>
          </div>
          <Sidebar />
          <div className="mt-auto border-t p-4">
            <div className="flex items-center">
              <Image
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User"
                width={32}
                height={32}
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">
                  {username || "Institute Admin"}
                </p>
                <p className="text-xs font-medium text-gray-500">
                  Institute Dashboard
                </p>
              </div>
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <div className="rounded-lg bg-white p-6 shadow-md">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default DashboardComponent;
