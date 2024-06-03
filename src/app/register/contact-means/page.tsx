"use client";

import PageCounter from "@/components/register/counter";
import NavbarMinimalist from "@/components/register/navbar";
import TitleWow from "@/components/title";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../style.css";
import { ExistEmailModel } from "@/model/model";
import { existEmail } from "@/api/account/exist-email";

const ContactMeans = () => {
  const { user, setUser } = useUserContext(); // Obteniendo el contexto y funciones del contexto
  const [email, setEmail] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const router = useRouter();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleCellPhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const filteredValue = value.replace(/[eE]/g, "");
    setCellPhone(filteredValue);
  };

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validaciones
    if (!email.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, ingrese su correo electrónico.",
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }
    if (!isValidEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, ingrese un correo electrónico válido.",
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }

    try {
      const response: ExistEmailModel = await existEmail(email);

      if (response.exist) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "El correo electrónico ingresado ya está registrado. Por favor, ingrese otro correo electrónico.",
          color: "white",
          background: "#0B1218",
          timer: 43500,
        });

        return;
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No fue posible validar su información, por favor intente nuevamente más tarde.",
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }

    if (user) {
      setUser({
        ...user,
        email: email,
        cell_phone: cellPhone,
      });
    }
    router.push("/register/terms-and-conditions");
  };

  const handleVolverClick = () => {
    router.back();
  };

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setCellPhone(user.cell_phone || "");
    }
  }, [setUser]);

  return (
    <div className="contenedor register">
      <NavbarMinimalist />

      <div className="register-container">
        <TitleWow
          title=" Registrarme en "
          description="Esto es lo que utilizarás cuando inicies sesión en los sitios web y aplicaciones móviles."
        />

        <form className="register-container-form" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label
              htmlFor="countrySelect"
              className="mb-2 register-container-form-label"
            >
              Correo Electronico
            </label>

            <input
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              type="text"
              placeholder="Ingrese su correo electronico"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="firstNameInput"
              className="mb-2 register-container-form-label"
            >
              Número de teléfono{" "}
            </label>
            <input
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              type="number"
              placeholder="Ingrese un telefono de contacto."
              value={cellPhone}
              onChange={handleCellPhoneChange}
            />
          </div>

          <PageCounter currentSection={3} totalSections={5} />
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

export default ContactMeans;
