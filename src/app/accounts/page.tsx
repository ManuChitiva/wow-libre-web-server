"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { AccountsModel } from "@/model/model";
import { getAccounts } from "@/api/account";
import Link from "next/link";
import { useUserContext } from "@/context/UserContext";
import "./style.css";
import LoadingSpinner from "@/components/loading-spinner";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import { InternalServerError } from "@/dto/generic";
import { useRouter } from "next/navigation";
import useAuth from "@/hook/useAuth";

const LimitAccountRegister = 10;

const Page = () => {
  const router = useRouter();
  const { clearUserData } = useUserContext();
  const token = Cookies.get("token");

  const [accounts, setAccounts] = useState<AccountsModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  useAuth("Session expirada");

  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    }

    const fetchData = async () => {
      try {
        const fetchedAccounts = await getAccounts(token);
        setAccounts(fetchedAccounts);
        setLoading(false);
      } catch (error: any) {
        if (error instanceof InternalServerError) {
          if (error.statusCode === 401 || error.statusCode === 403) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Su sesión ha expirado",
              color: "white",
              background: "#0B1218",
              timer: 4000,
              willClose: () => {
                clearUserData();
                router.push("/");
              },
            });
            return;
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor intente más tarde, el servicio no se encuentra disponible.",
            color: "white",
            background: "#0B1218",
            timer: 4500,
          });
        }
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredAccounts = accounts.filter((account) =>
    account.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  if (loading) {
    return (
      <div className="contenedor mx-auto">
        <NavbarAuthenticated />
        <div className="flex items-center justify-center mt-5">
          <div className="empty-table-message mb-4">
            <div className="content mb-48">
              <img
                src="/img/profile/create-account.png"
                alt="World of Warcraft Logo"
                className="logo"
              />
              <p className="mb-5">
                No es posible obtener el detalle de tus cuentas en este momento,
                por favor espera.
              </p>
              <LoadingSpinner />
            </div>
          </div>
        </div>
      </div>
    );
  }
  const accountMaximus = accounts && accounts.length > LimitAccountRegister;

  return (
    <div className="contenedor dark h-screen-md">
      <NavbarAuthenticated />

      <div className="text-center pt-20">
        <h1 className="text-4xl font-bold text-white">
          Administración de Cuentas de World of Warcraft
        </h1>
        <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
          Gestiona y administra las cuentas de World of Warcraft de manera
          eficiente y segura.
        </p>
      </div>
      {accounts && accounts.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-20">
          <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-midnight">
            <div className="relative inline-block text-left ml-2">
              <button
                id="dropdownActionButton"
                data-dropdown-toggle="dropdownAction"
                className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button"
                onClick={toggleDropdown}
              >
                <span className="sr-only text-lg">Action button</span>
                Action
                <svg
                  className="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdownAction"
                className={`${
                  dropdownVisible ? "block" : "hidden"
                } absolute left-1 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
              >
                {!accountMaximus && (
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownActionButton"
                  >
                    <li>
                      <Link
                        href="/register/username"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Crear cuenta
                      </Link>
                    </li>
                  </ul>
                )}
                <div className="py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Eliminar usuario
                  </a>
                </div>
              </div>
            </div>

            <label htmlFor="table-search-users" className="sr-only">
              Search
            </label>
            <div className="relative pr-2">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none ">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search-users"
                className="block p-2 ps-10 text-lg text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Buscar por usuario"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <table className="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center"></div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Usuario
                </th>
                <th scope="col" className="px-6 py-3">
                  Expansion
                </th>
                <th scope="col" className="px-6 py-3">
                  Online
                </th>
                <th scope="col" className="px-6 py-3">
                  Login Fallidos
                </th>
                <th scope="col" className="px-6 py-3">
                  Ultima Conexion
                </th>
                <th scope="col" className="px-6 py-3">
                  Ultima Ip
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredAccounts.map((row) => (
                <tr
                  key={row.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id={`checkbox-table-search-${row.id}`}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor={`checkbox-table-search-${row.id}`}
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className="px-6 py-4">{row.id}</td>
                  <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={row.logo_expansion}
                      alt="Icon Version Wow"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">
                        {row.username}
                      </div>
                      <div className="font-normal text-gray-500">
                        {row.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{row.expansion}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${
                          row.online ? "bg-green-500" : "bg-red-500"
                        } me-2`}
                      ></div>
                      {row.online ? "Online" : "Offline"}
                    </div>
                  </td>
                  <td className="px-6 py-4 items-center">
                    {row.failed_logins}
                  </td>
                  <td className="px-6 py-4">{row.join_date}</td>
                  <td className="px-6 py-4">{row.last_ip}</td>
                  <td className="px-6 py-4">
                    <a
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                      onClick={() =>
                        router.push(`/accounts/detail?id=${row.id}`)
                      }
                    >
                      Administrar
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-table-message items-center justify-center">
          <div className="content shadow-md sm:rounded-lg">
            <img
              src="/img/profile/create-account.png"
              alt="World of Warcraft Logo"
              className="logo pb-10 pt-10"
            />
            <p className="mb-10">
              No hay cuentas registradas. <br />
              ¡Crea una cuenta de juego ahora!
            </p>
            {accounts && accounts.length <= 10 && (
              <Link
                className="create-account-btn mb-2"
                href="/register/username"
              >
                Crear una cuenta
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
