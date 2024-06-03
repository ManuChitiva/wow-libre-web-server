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
import { registerAccountWeb } from "@/api/account/register";
import { AccountWebRequestDto } from "@/model/model";
import Cookies from "js-cookie";

const AccountIngame = () => {
  const { user, setUser, clearUserData } = useUserContext();
  const language = user.language;
  const country = user.country;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

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
      console.log(response.jwt);
      Cookies.set("token", response.jwt, { expires: 7 });
      Cookies.set("refresh_token", response.refresh_token, { expires: 7 });
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
    clearUserData();

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
    });
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

          <PageCounter currentSection={5} totalSections={5} />
          <button
            className=" text-white px-5 py-5 rounded-md mt-8 button-register"
            type="submit"
          >
            Confirmar
          </button>
          <button
            className="text-white px-5 py-5 rounded-md mt-8 button-register"
            type="button" // Asegúrate de cambiar el tipo a "button"
            onClick={handleVolverClick} // Agrega el evento onClick
          >
            Volver
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountIngame;
