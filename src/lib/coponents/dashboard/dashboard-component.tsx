import Image from "next/image";
import Sidebar from "./sidebar";

function DashboardComponent({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <div className="flex items-center">
            <Image
              src="https://www.svgrepo.com/show/499831/target.svg"
              width={32}
              height={32}
              alt="Logo"
              className="h-8 w-auto"
            />
            <span className="ml-2 text-xl font-semibold text-gray-800">
              Dashboard
            </span>
          </div>
        </div>
        <Sidebar />
        <div className="mt-auto p-4 border-t">
          <div className="flex items-center">
            <img
              className="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User"
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
        <div className="mt-4 p-6 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">{children}</p>
        </div>
      </main>
    </div>
  );
}

export default DashboardComponent;
