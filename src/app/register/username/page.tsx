"use client";

import PageCounter from "@/components/register/counter";
import TitleWow from "@/components/title";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import "../style.css";
import NavbarMinimalist from "@/components/navbar-minimalist";

const crypto = require("crypto");

const AccountIngame = () => {
  const { user, setUser, clearUserData } = useUserContext(); // Obteniendo el contexto y funciones del contexto
  const [userName, setUsername] = useState("");
  const router = useRouter();

  const handleUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userName.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ingrese un usuario.",
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
      return;
    }

    if (userName.trim().length < 5 || userName.trim().length > 20) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La contraseña debe ser superior a 5 caracteres e inferior a 20 caracteres.",
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
      return;
    }

    if (user) {
      setUser({
        ...user,
        username: userName,
      });
    }
    router.push("/register/account-ingame");
  };

  const handleVolverClick = () => {
    router.back();
  };

  return (
    <div className="contenedor register">
      <NavbarMinimalist />

      <div className="register-container">
        <TitleWow
          title=" Registrarme en "
          description="Este nombre será tu identidad pública. Podrás cambiarlo una vez de manera gratuita."
        />
        <form
          className="register-container-form pt-5"
          onSubmit={handleFormSubmit}
        >
          <div className="form-group">
            <label
              htmlFor="countrySelect"
              className="mb-2 register-container-form-label"
            >
              Usuario
            </label>

            <input
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              type="text"
              placeholder="Ingrese un usuario"
              value={userName}
              onChange={handleUserNameChange}
            />
          </div>

          <PageCounter currentSection={1} totalSections={2} />
          <button
            className=" text-white px-5 py-5 rounded-md mt-8 button-register"
            type="submit"
          >
            Continuar
          </button>
          <button
            className="text-white px-5 py-5 rounded-md mt-8 button-register"
            type="button"
            onClick={handleVolverClick}
          >
            Volver
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountIngame;
