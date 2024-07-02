"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useEffect } from "react";
import "./style.css";
import NavbarMinimalist from "@/components/navbar-minimalist";

const Congrats = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const country = searchParams.get("country");
  const phone = searchParams.get("phone");
  const router = useRouter();

  const handleLinkAccounts = () => {
    router.push("/accounts");
  };

  return (
    <div className=" contenedor">
      <NavbarMinimalist />
      <div className="congrats">
        <div className="congrats-container">
          <img
            src="/img/congrats/pngegg.png"
            alt="WarImgCongrats"
            className="congrats-img-large "
          />
          <div className="congrats-content">
            <img
              src="/img/logos/logo.png"
              alt="Logo WowLibre"
              className="congrats-img"
            />

            <h2 className="title">
              Bienvenido a <br /> la comunidad libre
            </h2>

            <div className="account-info text-white">
              <p className="text-2xl md:text-4xl lg:text-3xl xl:text-2xl pb-5">
                ¡Te damos la más cordial bienvenida a nuestra comunidad! Estamos
                encantados de tenerte aquí. Estás a solo un paso de disfrutar de
                tus juegos favoritos de forma gratuita. ¡Termina de crear tu
                cuenta de juego y comienza a jugar ahora!
              </p>
              <p className="mt-2 text-2xl md:text-3xl lg:text-4xl xl:text-3xl pb-10">
                Detalles de la cuenta creada:
              </p>

              {email && (
                <p className="account-email text-2xl md:text-4xl lg:text-3xl xl:text-2xl">
                  Email: {email}
                </p>
              )}
              {country && (
                <p className="account-username text-2xl md:text-4xl lg:text-3xl xl:text-2xl">
                  País: {country}
                </p>
              )}
              {phone && (
                <p className="account-username text-2xl md:text-4xl lg:text-3xl xl:text-2xl">
                  Teléfono: {phone}
                </p>
              )}
              <button
                className="download-button  text-white text-lg md:text-xl lg:text-2xl xl:text-2xl  "
                type="button"
                onClick={handleLinkAccounts}
              >
                Crear cuenta de juego
              </button>
              <button
                className="download-button  text-white text-lg md:text-xl lg:text-2xl xl:text-2xl "
                type="button"
              >
                Descargar Cliente
              </button>
            </div>
            <p className="text-white mt-10 text-lg md:text-xl lg:text-1xl xl:text-1xl">
              World of Warcraft® and Blizzard Entertainment® are all trademarks
              or registered trademarks of Blizzard Entertainment in the United
              States and/or other countries. These terms and all related
              materials, logos, and images are copyright © Blizzard
              Entertainment. This site is in no way associated with or endorsed
              by Blizzard Entertainment®.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Congrats;
