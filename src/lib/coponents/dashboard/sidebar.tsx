"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MaterialIcon, { MaterialIconName } from "../material-icon";

const navItems: {
  label: string;
  href: string;
  icon: MaterialIconName;
}[] = [
  { label: "Dashboard", href: "/institute/dashboard", icon: "dashboard" },
  { label: "Students", href: "/institute/dashboard/students", icon: "groups" },
  { label: "Courses", href: "/institute/dashboard/courses", icon: "folder" },
  {
    label: "Teachers",
    href: "/institute/dashboard/teachers",
    icon: "calendarToday",
  },
  {
    label: "Categories",
    href: "/institute/dashboard/categories",
    icon: "inventory",
  },
  { label: "Reports", href: "/institute/dashboard/reports", icon: "barChart" },
];

function isActiveRoute(pathname: string, href: string) {
  if (href === "/institute/dashboard") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="mt-5 px-2">
      {navItems.map((item) => {
        const isActive = isActiveRoute(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md first:mt-0 ${
              isActive
                ? "bg-indigo-100 text-indigo-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <MaterialIcon
              name={item.icon}
              className={`mr-3 h-6 w-6 ${
                isActive
                  ? "text-indigo-700"
                  : "text-gray-400 group-hover:text-gray-500"
              }`}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
