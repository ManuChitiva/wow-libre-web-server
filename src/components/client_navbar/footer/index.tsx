"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/footer";

const ClientFooter = () => {
  const pathname = usePathname();
  const pathsWithoutNavbar = ["/login", "/register", "/congrats"];

  const isPathExcluded =
    pathsWithoutNavbar.includes(pathname) ||
    pathsWithoutNavbar.some((path) => pathname.startsWith(path));

  return !isPathExcluded ? <Footer /> : null;
};

export default ClientFooter;
