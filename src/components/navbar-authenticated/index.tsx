import { useUserContext } from "@/context/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const NavbarAuthenticated = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, clearUserData } = useUserContext();
  const router = useRouter();
  const [avatar, setAvatar] = useState("");
  const [loggin, setLoggin] = useState(false);

  useEffect(() => {
    setAvatar(user.avatar);
    setIsLoading(false);
    setLoggin(user.logged_in);
  }, [user]);

  if (isLoading) {
    return null;
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  const handleLogout = () => {
    clearUserData();
    router.push("/");
  };

  return (
    <nav className="bg-midnight mt-10 mb-20">
      <div className="mx-auto max-w-9xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="absolute  -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMobileMenuOpen ? "hidden" : "block"} h-12 w-12`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <a
              className="flex flex-shrink-0 items-center cursor-pointer"
              href="/"
            >
              <img
                className="h-16 w-auto mt-2"
                src="/img/logos/logo.png"
                alt="Your Company"
              />
              <p className="text-gray-300 ml-5  title-server mt-9 text-4xl">
                Wow Libre
              </p>
            </a>
            <div className="hidden sm:ml-40 sm:block sm:mt-5">
              <div className="flex space-x-9">
                <Link
                  className="rounded-md  px-4 py-3 text-x2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white "
                  href="/"
                >
                  Inicio
                </Link>
                <Link
                  className="rounded-md  px-4 py-3 text-x2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white "
                  href="/guild"
                >
                  Hermandades
                </Link>
                <Link
                  className="rounded-md  px-4 py-3 text-x2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white "
                  href="/comunity"
                >
                  Comunidad
                </Link>
                <Link
                  className="rounded-md  px-4 py-3 text-x2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white "
                  href="/bank"
                >
                  Banco
                </Link>
                <Link
                  className="rounded-md  px-4 py-3 text-x2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white "
                  href="/store"
                >
                  Tienda
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute  inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">View notifications</span>
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button>

            <div className="relative ml-5">
              <div>
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="true"
                  onClick={toggleUserMenu}
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  {loggin ? (
                    <img
                      className="h-14 w-14 rounded-full"
                      src={avatar}
                      alt="Icon profile"
                    />
                  ) : (
                    <img
                      className="h-14 w-14 rounded-full"
                      src="/img/logos/logo.png"
                      alt="Icon Profile Default"
                    />
                  )}
                </button>
              </div>
              {isUserMenuOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  {loggin ? (
                    <div className="hover:text-blue-500">
                      <Link
                        href="/accounts"
                        className="block px-4 py-3 text-base text-gray-700"
                        role="menuitem"
                        id="user-menu-item-0"
                      >
                        Cuentas
                      </Link>
                      <a
                        href="#"
                        className="block px-4 py-3 text-base text-gray-700"
                        role="menuitem"
                        id="user-menu-item-1"
                      >
                        Configuracion
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-3 text-base text-gray-700"
                        role="menuitem"
                        id="user-menu-item-2"
                        onClick={handleLogout}
                      >
                        Salir
                      </a>
                    </div>
                  ) : (
                    <div>
                      <Link
                        href="/login"
                        className="block px-4 py-3 text-base text-gray-700 hover:bg-blue-100"
                        role="menuitem"
                        id="user-menu-item-0"
                      >
                        Ingresar
                      </Link>
                      <Link
                        href="/register"
                        className="block px-4 py-3 text-base text-gray-700 hover:bg-blue-100"
                        role="menuitem"
                        id="user-menu-item-0"
                      >
                        Registrarme
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <a
              href="#"
              className="block rounded-md px-4 py-3 text-x2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              aria-current="page"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="block rounded-md px-4 py-3 text-x2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Team
            </a>
            <a
              href="#"
              className="block rounded-md px-4 py-3 text-x2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Projects
            </a>
            <a
              href="#"
              className="block rounded-md px-4 py-3 text-x2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Calendar
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarAuthenticated;
