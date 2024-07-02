"use client";
import { getGuilds } from "@/api/guilds";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import { GuildDto, GuildsDto } from "@/model/model";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const Guild = () => {
  const [guilds, setGuilds] = useState<GuildDto[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredAccounts, setFilteredAccounts] = useState<GuildDto[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const accountsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: GuildsDto = await getGuilds(
          currentPage,
          accountsPerPage
        );
        setGuilds(response.guilds);
      } catch (error) {
        console.error("Ha ocurrido un error al obtener los personajes", error);
        setGuilds([]);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const filtered = guilds.filter((guild) =>
      guild.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAccounts(filtered);
  }, [searchTerm, guilds]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * accountsPerPage;
  const currentAccounts = filteredAccounts.slice(
    offset,
    offset + accountsPerPage
  );

  return (
    <div className="contenedor dark h-screen-md">
      <NavbarAuthenticated />

      <div className="text-center pt-20">
        <h1 className="text-4xl font-bold text-white">
          Forja tu Leyenda: Explora las Hermandades de Azeroth
        </h1>
        <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
          Descubre un mundo de camaradería y aventuras épicas. Encuentra tu
          comunidad perfecta entre las legendarias hermandades de World of
          Warcraft, donde la amistad y la estrategia se unen para desafiar los
          límites de Azeroth.
        </p>
      </div>

      <div className="relative overflow-x-auto  sm:rounded-lg pt-20">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-midnight">
          <div className="relative inline-block text-left ml-2">
            <button
              id="dropdownActionButton"
              data-dropdown-toggle="dropdownAction"
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
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
                false ? "block" : "hidden"
              } absolute left-1 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
            >
              {!false && (
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

          <label htmlFor="table-search" className="sr-only">
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
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Guild Master
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha de creacion
              </th>
              <th scope="col" className="px-6 py-3">
                Miembros
              </th>
              <th scope="col" className="px-6 py-3">
                Dinero
              </th>
              <th scope="col" className="px-6 py-3">
                Redes
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {currentAccounts.map((row) => (
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
                    src={row.avatar}
                    alt="Icon Version Wow"
                  />
                  <div className="ps-3">
                    <div className="text-base font-semibold">{row.name}</div>
                    <div className="font-normal text-gray-500">Hermandad</div>
                  </div>
                </td>
                <td className="px-6 py-4 ">{row.leader_name}</td>
                <td className="px-6 py-4 ">{row.create_date}</td>
                <td className="px-6 py-4">{row.members}</td>
                <td className="px-6 py-4">{row.bank_money}</td>
                <td className="px-6 py-4">
                  <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
                    Discord
                  </a>
                </td>
                <td className="px-6 py-4">
                  <Link
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                    href={{
                      pathname: `/guild/${row.id}`,
                    }}
                  >
                    Ir a detalle de guild
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center items-center mt-10 ">
          <ReactPaginate
            previousLabel={"Anterior"}
            nextLabel={"Siguiente"}
            breakLabel={""}
            pageCount={Math.ceil(filteredAccounts.length / accountsPerPage)}
            marginPagesDisplayed={1}
            pageRangeDisplayed={1}
            onPageChange={handlePageClick}
            containerClassName={"pagination flex space-x-2"}
            pageClassName={"page-item"}
            pageLinkClassName={
              "text-white py-2 px-3 rounded-lg hover:bg-gray-600"
            }
            previousClassName={"page-item"}
            previousLinkClassName={
              "page-link text-white py-2 px-3 rounded-lg hover:bg-gray-600"
            }
            nextClassName={"page-item"}
            nextLinkClassName={
              "page-link text-white py-2 px-3 rounded-lg hover:bg-gray-600"
            }
            breakClassName={"page-item"}
            breakLinkClassName={
              "page-link text-white py-2 px-3 rounded-lg hover:bg-gray-600"
            }
            activeClassName={"active"}
            activeLinkClassName={"bg-blue-900"} // Establecer el color de fondo y texto del número de página activo
          />
        </div>
      </div>
    </div>
  );
};

export default Guild;
