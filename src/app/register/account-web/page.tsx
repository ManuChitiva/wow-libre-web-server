"use client";

import PageCounter from "@/components/register/counter";
import NavbarMinimalist from "@/components/navbar-minimalist";
import TitleWow from "@/components/title";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import "../style.css";
import { registerAccountWeb } from "@/api/account/register";
import { AccountWebRequestDto } from "@/model/model";
import Cookies from "js-cookie";

const AccountWeb = () => {
  const { user, setUser, clearUserData } = useUserContext();
  const language = user.language;
  const country = user.country;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const [avatar, setAvatar] = useState("");

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

    try {
      const userDateOfBirth = user.date_of_birth;

      const formattedDateOfBirth = userDateOfBirth
        ? !isNaN(new Date(userDateOfBirth).getTime())
          ? new Date(userDateOfBirth).toISOString().split("T")[0]
          : new Date().toISOString()
        : new Date().toISOString();

      const requestBody: AccountWebRequestDto = {
        country: user.country,
        date_of_birth: formattedDateOfBirth,
        first_name: user.first_name,
        last_name: user.last_name,
        cell_phone: user.cell_phone,
        email: user.email,
        password: password,
      };

      const response = await registerAccountWeb(requestBody);
      const { jwt, refresh_token, expiration_date, avatar_url } = response;
      const expirationDateUTC = new Date(expiration_date).toUTCString();

      setUser({
        id: null,
        username: "",
        country: country,
        language: language,
        date_of_birth: null,
        first_name: "",
        last_name: "",
        cell_phone: "",
        email: "",
        logged_in: true,
        avatar: avatar_url,
      });

      Cookies.set("token", jwt, {
        expires: new Date(expirationDateUTC),
        secure: true,
        sameSite: "Strict",
      });

      Cookies.set("refresh_token", refresh_token, {
        expires: new Date(expirationDateUTC),
        secure: true,
        sameSite: "Strict",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ha ocurrido un error inesperado al intentar continuar con el registro. Por favor, inténtelo de nuevo más tarde o comuníquese con el soporte técnico.",
        background: "#0B1218",
        timer: 4500,
      });
      return;
    }

    router.push(
      `/congrats?email=${user.email}&country=${user.country}&phone=${user.cell_phone}`
    );
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
          description="Protege tu cuenta y elige una contraseña segura para la web administrativa."
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
              Contraseña para la web
            </label>

            <input
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              autoComplete="new-password"
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
              autoComplete="new-password"
              placeholder="Ingrese nuevamente su contraseña"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>

          <PageCounter currentSection={5} totalSections={5} />
          <button
            className=" text-white px-5 py-5 rounded-md mt-8 button-register"
            type="submit"
          >
            Confirmar
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

export default AccountWeb;
