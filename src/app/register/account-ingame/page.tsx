"use client";

import PageCounter from "@/components/register/counter";
import NavbarMinimalist from "@/components/register/navbar";
import TitleWow from "@/components/title";
import { useUserContext } from "@/context/UserContext";
import { encryptPassword } from "@/security";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import "../style.css";
import { registerAccountGame } from "@/api/account/register";
import { AccountGameRequestDto } from "@/model/model";
import LoadingSpinner from "@/components/loading-spinner";
const crypto = require("crypto");
import Cookies from "js-cookie";

const AccountIngame = () => {
  const { user, setUser } = useUserContext(); // Obteniendo el contexto y funciones del contexto
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Nuevo estado para la confirmación de contraseña
  const router = useRouter();
  const { computeVerifier, params } = require(`trinitycore-srp6`);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const jwt = Cookies.get("token");

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Las contraseñas no coinciden",
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }

    if (!password.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La contraseña está vacía.",
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }

    if (password.trim().length < 5 || password.trim().length > 30) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La contraseña debe ser superior a 5 caracteres e inferior a 30 caracteres.",
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }
    setIsSubmitting(true);

    try {
      const salt = crypto.randomBytes(32);

      const verifier = computeVerifier(
        params.trinitycore,
        Buffer.from(salt),
        user.username.toUpperCase(),
        password.toUpperCase()
      );

      await registerAccountGame(
        {
          username: user.username,
          salt: Buffer.from(salt).toString("hex"),
          verifier: Buffer.from(verifier).toString("hex"),
        },
        jwt || ""
      );

      router.push("/account");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message, // Imprimir el mensaje de error
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
    } finally {
      setIsSubmitting(false);
    }
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
          description="Protege tu cuenta y elige una contraseña segura para el juego."
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
              Contraseña para el juego
            </label>

            <input
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="firstNameInput"
              className="mb-2 register-container-form-label"
            >
              Confirmar Contraseña
            </label>
            <input
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              type="password"
              placeholder="Ingrese nuevamente su contraseña"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          {isSubmitting && (
            <div className="mb-4 text-center">
              <LoadingSpinner />{" "}
              <p className="mt-4 text-gray-600 text-lg">Creando cuenta...</p>
            </div>
          )}
          <PageCounter currentSection={2} totalSections={2} />
          <button
            className=" text-white px-5 py-5 rounded-md mt-8 button-register"
            type="submit"
            disabled={isSubmitting}
          >
            Continuar
          </button>
          <button
            className="text-white px-5 py-5 rounded-md mt-8 button-register"
            type="button"
            disabled={isSubmitting}
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
