"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import "./style.css";
import NavbarMinimalist from "@/components/register/navbar";
import TitleWow from "@/components/title";
import Select from "react-select";
import PageCounter from "@/components/register/counter";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { CountryModel } from "@/model/model";
import { getAvailableCountries } from "@/api/country";

const defaultCountryOptions: CountryModel[] = [
  { value: "Otro", label: "Otro", language: "es" },
];

const Register = () => {
  const { user, setUser } = useUserContext();
  const router = useRouter();
  const [country, setCountry] = useState<string>("");
  const [language, setLanguage] = useState<string>("");

  const [fecha, setFecha] = useState<string>("");

  const [countryOptions, setCountryOptions] = useState<CountryModel[]>(
    defaultCountryOptions
  );

  const handleFechaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFecha(event.target.value);
  };
  const handleCountryChange = (selectedOption: CountryModel | null) => {
    setCountry(selectedOption ? selectedOption.value : "");
    setLanguage(selectedOption ? selectedOption.language : "es");
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!country.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, selecciona un país válido.",
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }

    if (!fecha) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, ingresa una fecha de nacimiento válida.",
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }

    if (user) {
      setUser({
        ...user,
        language: language,
        country: country,
        date_of_birth: new Date(fecha),
      });
    }
    router.push("/register/know-you");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCountryOptions = await getAvailableCountries();
        setCountryOptions(fetchedCountryOptions);
      } catch (error) {
        setCountryOptions(defaultCountryOptions);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      setCountry(user.country || "");
      setFecha(
        user.date_of_birth
          ? new Date(user.date_of_birth).toISOString().split("T")[0]
          : ""
      );
    }
  }, [setUser]);

  return (
    <div className="contenedor register">
      <NavbarMinimalist />

      <div className="register-container">
        <TitleWow
          title=" Registrarme en "
          description="¡Toda la información que nos compartas en Wow Libre es como el
            ingrediente especial de tu experiencia alucinante! Cuanto más sepamos,
            mejor podremos hacerte vivir algo realmente extraordinario. Así que,
            ¡compártenos esos datos y prepárate para algo fuera de serie!"
        />

        <form className="register-container-form " onSubmit={handleFormSubmit}>
          <div className="form-group select-container">
            <label
              htmlFor="countrySelect"
              className="mb-2 register-container-form-label"
            >
              Selecciona el país
            </label>
            <Select
              instanceId={"wsad123wqwe"}
              className="mb-3 border-gray-300 rounded-md text-black register-input p-1"
              options={countryOptions}
              onChange={handleCountryChange}
              value={countryOptions.find((option) => option.value === country)}
              placeholder="Selecciona el país"
              isSearchable
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="fechaInput"
              className="mb-2 register-container-form-label"
            >
              Fecha de Nacimiento
            </label>
            <input
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              type="date"
              id="fechaInput"
              name="fechaInput"
              value={fecha}
              onChange={handleFechaChange}
            />
          </div>

          <PageCounter currentSection={1} totalSections={5} />
          <button
            className=" text-white px-5 py-5 rounded-md mt-8 button-register"
            type="submit"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
