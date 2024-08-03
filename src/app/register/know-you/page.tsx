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

const MAX_NAME_LENGTH = 50;
const MIN_NAME_LENGTH = 5;
const MIN_FIRST_NAME_LENGTH = 5;
const MAX_FIRST_NAME_LENGTH = 50;

const KnowYou = () => {
  const { user, setUser } = useUserContext();
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

    const isValidLastName =
      !lastName.trim() ||
      lastName.trim().length < MIN_NAME_LENGTH ||
      lastName.trim().length > MAX_NAME_LENGTH;

    if (isValidLastName) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("register.error.last-name-invalid"),
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }

    if (
      !firstName.trim() ||
      firstName.trim().length < MIN_FIRST_NAME_LENGTH ||
      firstName.trim().length > MAX_FIRST_NAME_LENGTH
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("register.error.first-name-invalid"),
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }

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
      setLastName(user.last_name);
      setFirstName(user.first_name);
    }
  }, [setUser]);

  return (
    <div className="contenedor register">
      <NavbarMinimalist />

      <div className="register-container">
        <TitleWow
          title={t("register.title-server-sub-title")}
          description={t("register.section-page.kown-you.title-server-message")}
        />

        <form
          className="register-container-form pt-5"
          onSubmit={handleFormSubmit}
        >
          <div className="form-group">
            <label
              htmlFor="firstName"
              className="mb-2 register-container-form-label"
            >
              {t("register.section-page.kown-you.input.select-firstname")}
            </label>
            <input
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              type="text"
              placeholder={t(
                "register.section-page.kown-you.input.select-firstname-place-holder"
              )}
              value={firstName}
              id="firstName"
              onChange={handleFirstNameChange}
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="lastName"
              className="mb-2 register-container-form-label"
            >
              {t("register.section-page.kown-you.input.select-lastname")}
            </label>

            <input
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              type="text"
              placeholder={t(
                "register.section-page.kown-you.input.select-lastname-place-holder"
              )}
              value={lastName}
              onChange={handleLastNameChange}
              id="lastName"
            />
          </div>

          <PageCounter currentSection={2} totalSections={5} />
          <button
            className=" text-white px-5 py-5 rounded-md mt-8 button-register"
            type="submit"
          >
            {t("register.section-page.kown-you.button.btn-primary")}
          </button>
          <button
            className="text-white px-5 py-5 rounded-md mt-8 button-register"
            type="button"
            onClick={handleVolverClick}
          >
            {t("register.section-page.kown-you.button.btn-secondary")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default KnowYou;
