"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExchangeAlt,
  faCog,
  faUser,
  faClipboard,
  faComment,
  faEnvelope,
  faShieldHeart,
  faCrown,
} from "@fortawesome/free-solid-svg-icons";

import { useUserContext } from "@/context/UserContext";
import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import LoadingSpinner from "@/components/loading-spinner";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import "../style.css";

import { getCharacters } from "@/api/account/character";
import { AccountDetailDto, Character, Characters } from "@/model/model";
import Cookies from "js-cookie";
import CharacterSelection from "@/components/character_selection";
import Friend from "@/components/friends/friend";
import NavbarMinimalist from "@/components/register/navbar";
import { getAccount } from "@/api/account";
import AccountForm from "@/components/account";

const AccountDetail = () => {
  const searchParams = useSearchParams();

  const token = Cookies.get("token");
  const accountId = searchParams.get("id");

  const [isLoading, setIsLoading] = useState(true);
  const [userDetail, setUserDetail] = useState<AccountDetailDto>();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character>();
  const router = useRouter();

  if (accountId == null) {
    router.push("/account");
  }

  /* Api Obtener los personajes del cliente */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: Characters = await getCharacters(token || "");
        setCharacters(response.characters);
      } catch (error) {
        console.error("Ha ocurrido un error al obtener los personajes", error);
        setCharacters([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setIsLoading]);

  /* Api Obtener  los detalles del cliente*/
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AccountDetailDto = await getAccount(
          token || "",
          accountId || ""
        );
        setUserDetail(response);
        setIsLoading(false); // Marcamos la carga como completada
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se ha podido obtener el detalle",
          color: "white",
          background: "#0B1218",
          timer: 4500,
        });
        router.push("/account");
      }
    };

    fetchData();
  }, [setIsLoading]);

  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacter(character);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen min-w-full">
        <div className="flex flex-col items-center">
          <LoadingSpinner />
          <p className="mt-4 text-white text-lg">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="contenedor mx-auto ">
      <NavbarMinimalist />

      {/* Sección de perfil */}
      <div className="flex flex-col items-center justify-center py-20 ">
        <img
          src="https://via.placeholder.com/150"
          alt="Avatar del usuario"
          className="w-36 h-36 rounded-full mb-4 box-shadow-primary"
        />
        <div className="text-center ">
          <h1 className="text-white text-4xl font-semibold">
            {userDetail?.account_web.first_name}{" "}
            {userDetail?.account_web.last_name}
          </h1>
          <p className="text-white  pb-2 text-2xl ">
            Email: {userDetail?.email}
          </p>
          <p className="text-white  pb-2 text-2xl ">
            Pais: {userDetail?.account_web.country}
          </p>
          <p className="text-white  pb-2 text-2xl ">
            Username: {userDetail?.username}
          </p>
          <div className="mt-4">
            {!isLoading && characters.length > 0 ? (
              <CharacterSelection
                characters={characters}
                onSelectCharacter={handleSelectCharacter}
              />
            ) : (
              <p className="text-white">No hay personajes disponibles</p>
            )}
          </div>
        </div>
      </div>

      {/* Secciones con pestañas */}
      <div className="mt-10  bg-profile eyelashes box-shadow-primary  overflow-hidden">
        <Tabs>
          <div className="flex flex-col lg:flex-row">
            {/* TabList para móviles (oculto en pantallas grandes) */}
            <TabList className=" flex flex-col border-b">
              <Tab className="py-6 px-6 text-white  bg-tablist cursor-pointer text-lg font-semibold flex items-center">
                <FontAwesomeIcon icon={faComment} className="mr-2 text-2xl" />
                Amigos
              </Tab>
              <Tab className="py-6 px-6 text-white bg-tablist first-letter:text-white   cursor-pointer text-lg font-semibold flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-2xl" />
                Notificaciones
              </Tab>
              <Tab className="py-6 px-6 text-white bg-tablist  cursor-pointer text-lg font-semibold flex items-center">
                <FontAwesomeIcon icon={faUser} className="mr-2 text-2xl" />
                Account
              </Tab>
              <Tab className="py-6 px-6 text-white  bg-tablist cursor-pointer text-lg font-semibold flex items-center">
                <FontAwesomeIcon icon={faClipboard} className="mr-2 text-2xl" />
                Movimientos
              </Tab>
              <Tab className="py-6 px-6 text-white  bg-tablist cursor-pointer text-lg font-semibold flex items-center">
                <FontAwesomeIcon
                  icon={faShieldHeart}
                  className="mr-2 text-2xl"
                />
                Seguridad
              </Tab>
              <Tab className="py-6 px-6 text-white bg-tablist  cursor-pointer text-lg font-semibold flex items-center">
                <FontAwesomeIcon icon={faCrown} className="mr-2" />
                Pass Battle
              </Tab>
            </TabList>

            {/* Separadores verticales (ocultos en pantallas pequeñas) */}
            <div className="lg:border-l border-gray-300 hidden lg:block"></div>

            {/* Paneles de las pestañas */}
            <div className="w-full px-4">
              <TabPanel>
                {/* Contenido de la pestaña Amigos */}
                {selectedCharacter && (
                  <Friend character={selectedCharacter} token={token || ""} />
                )}
              </TabPanel>
              <TabPanel>
                {/* Contenido de la pestaña Notificaciones */}
                <div className="p-4">
                  Contenido de la pestaña Notificaciones
                </div>
              </TabPanel>
              <TabPanel>
                {/* Contenido de la pestaña Perfil Detallado */}
                {userDetail && token ? (
                  <AccountForm account={userDetail} tokenJwt={token} />
                ) : null}
              </TabPanel>
              <TabPanel>
                {/* Contenido de la pestaña Transacciones */}
                <div className="p-4">Contenido de la pestaña Transacciones</div>
              </TabPanel>
              <TabPanel>{/* Contenido de la pestaña Seguridad Web */}</TabPanel>
              <TabPanel>
                {/* Contenido de la pestaña Seguridad Ingame */}
              </TabPanel>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AccountDetail;
