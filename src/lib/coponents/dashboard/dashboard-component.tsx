import Sidebar from "./sidebar";
import MaterialIcon from "../material-icon";
import Image from "next/image";

function DashboardComponent({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center">
            <MaterialIcon
              name="trackChanges"
              className="h-8 w-8 text-gray-800"
            />
            <span className="ml-2 text-xl font-semibold text-gray-800">
              Dashboard
            </span>
          </div>
        </div>
        <Sidebar />
        <div className="mt-auto p-4 border-t">
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
                Rajesh Maheshwari
              </p>
              <p className="text-xs font-medium text-gray-500">View Profile</p>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="mt-4 rounded-lg bg-white p-6 shadow-md">{children}</div>
      </main>
    </div>
  );
}

export default DashboardComponent;
