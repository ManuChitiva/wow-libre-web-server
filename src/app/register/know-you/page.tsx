"use client";
import PageCounter from "@/components/register/counter";
import NavbarMinimalist from "@/components/navbar-minimalist";
import TitleWow from "@/components/title";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../style.css";
import { useTranslation } from "react-i18next";

const KnowYou = () => {
  const { user, setUser } = useUserContext(); // Obteniendo el contexto y funciones del contexto
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const router = useRouter();
  const { t } = useTranslation();

  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleVolverClick = () => {
    router.back();
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validaciones
    if (
      !lastName.trim() ||
      lastName.trim().length < 5 ||
      lastName.trim().length > 50
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, ingrese sus nombres validos.",
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }

    if (
      !firstName.trim() ||
      firstName.trim().length < 5 ||
      firstName.trim().length > 50
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, ingrese sus apellidos validos.",
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }

    // Actualizar los datos del usuario en el contexto
    if (user) {
      setUser({
        ...user,
        last_name: lastName,
        first_name: firstName,
      });
    }
    router.push("/register/contact-means");
  };

  useEffect(() => {
    if (user) {
      setLastName(user.last_name || "");
      setFirstName(user.first_name || "");
    }
  }, [setUser]);
  return (
    <div className="contenedor register">
      <NavbarMinimalist />

      <div className="register-container">
        <TitleWow
          title={t("register.title-server-sub-title")}
          description="Es posible que se utilice tu nombre real en el 
      futuro para verificar tu identidad cuando te pongas en contacto con WowLibre. 
      Por defecto, tu nombre real permanecerá oculto para otros usuarios."
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
              Ingrese su nombre{" "}
            </label>

            <input
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              type="text"
              placeholder="Ingrese sus nombres"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="firstNameInput"
              className="mb-2 register-container-form-label"
            >
              Ingrese sus apellidos
            </label>
            <input
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              type="text"
              placeholder="Ingrese sus apellidos"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>

          <PageCounter currentSection={2} totalSections={5} />
          <button
            className=" text-white px-5 py-5 rounded-md mt-8 button-register"
            type="submit"
          >
            Continuar
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

export default KnowYou;
