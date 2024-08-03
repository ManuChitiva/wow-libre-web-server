"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import "./style.css";
import TitleWow from "@/components/title";
import Select from "react-select";
import PageCounter from "@/components/register/counter";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { CountryModel } from "@/model/model";
import { getAvailableCountries } from "@/api/country";
import { useTranslation } from "react-i18next";
import NavbarMinimalist from "@/components/navbar-minimalist";

const defaultCountryOptions: CountryModel[] = [
  { value: "Otro", label: "Otro", language: "pt" },
  { value: "Others", label: "Others", language: "en" },
];

const Register = () => {
  const { t, i18n } = useTranslation();
  const { user, setUser } = useUserContext();
  const router = useRouter();
  const [country, setCountry] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [countryOptions, setCountryOptions] = useState<CountryModel[]>(
    defaultCountryOptions
  );

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleCountryChange = (selectedOption: CountryModel | null) => {
    const language = selectedOption ? selectedOption.language : "es";
    const countrySelect = selectedOption ? selectedOption.value : "";
    setCountry(countrySelect);
    setLanguage(language);
    i18n.changeLanguage(language);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!country.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("register.error.country-empty"),
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }

    if (!date) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("register.error.birth-date-empty"),
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
        date_of_birth: new Date(date),
      });
    }
    router.push("/register/know-you");
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCountryOptions = await getAvailableCountries();
      setCountryOptions(fetchedCountryOptions);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      i18n.changeLanguage(user.language);
      setCountry(user.country);
      setDate(
        user.date_of_birth
          ? new Date(user.date_of_birth).toISOString().split("T")[0]
          : ""
      );
      setLanguage(user.language);
    }
  }, [user]);

  return (
    <div className="contenedor register">
      <NavbarMinimalist />
      <div className="register-container">
        <TitleWow
          title={t("register.title-server-sub-title")}
          description={t("register.section-page.register.title-server-message")}
        />
        <form className="register-container-form" onSubmit={handleFormSubmit}>
          <div className="form-group select-container">
            <label
              htmlFor="countrySelect"
              className="mb-2 register-container-form-label"
            >
              {t("register.section-page.register.input.select-country")}
            </label>
            <Select
              instanceId={"wsad123wqwe"}
              className="mb-3 border-gray-300 rounded-md text-black register-input p-1"
              options={countryOptions}
              onChange={handleCountryChange}
              value={countryOptions.find((option) => option.value === country)}
              placeholder={t(
                "register.section-page.register.input.select-country-place-holder"
              )}
              isSearchable
              inputId="countrySelect"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="fechaInput"
              className="mb-2 register-container-form-label"
            >
              {t("register.section-page.register.input.select-birthday")}
            </label>
            <input
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              type="date"
              id="fechaInput"
              name="fechaInput"
              value={date}
              onChange={handleDateChange}
            />
          </div>
          <PageCounter currentSection={1} totalSections={5} />
          <button
            className="text-white px-5 py-5 rounded-md mt-8 button-register"
            type="submit"
          >
            {t("register.section-page.register.button.btn-primary")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
