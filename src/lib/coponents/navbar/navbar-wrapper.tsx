"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const hideNavbar =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/institute/dashboard") ||
    pathname.startsWith("/institute/create");

  if (hideNavbar) return null;

  return <Navbar />;
}
