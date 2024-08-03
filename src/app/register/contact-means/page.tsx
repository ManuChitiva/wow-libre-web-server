"use client";

import PageCounter from "@/components/register/counter";
import NavbarMinimalist from "@/components/navbar-minimalist";
import TitleWow from "@/components/title";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../style.css";
import { ExistEmailModel } from "@/model/model";
import { existEmail } from "@/api/account/exist-email";
import { useTranslation } from "react-i18next";

const ContactMeans = () => {
  const { user, setUser } = useUserContext();
  const [email, setEmail] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const router = useRouter();
  const { t } = useTranslation();

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

    if (!email.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("register.error.email-empty"),
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
        text: t("register.error.email-invalid"),
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }

    if (!cellPhone.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("register.error.phone-empty"),
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
          text: t("register.error.email-exist"),
          color: "white",
          background: "#0B1218",
          timer: 43500,
        });

        return;
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
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
      setEmail(user.email);
      setCellPhone(user.cell_phone);
    }
  }, [setUser]);

  return (
    <div className="contenedor register">
      <NavbarMinimalist />

      <div className="register-container">
        <TitleWow
          title={t("register.title-server-sub-title")}
          description={t(
            "register.section-page.contact-means.title-server-message"
          )}
        />

        <form className="register-container-form" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label
              htmlFor="emailInput"
              className="mb-2 register-container-form-label"
            >
              {t("register.section-page.contact-means.input.email-text")}
            </label>

            <input
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              type="email"
              id="emailInput"
              placeholder={t(
                "register.section-page.contact-means.input.email-text-place-holder"
              )}
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="phoneInput"
              className="mb-2 register-container-form-label"
            >
              {t("register.section-page.contact-means.input.phone-text")}
            </label>
            <input
              id="phoneInput"
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              type="number"
              placeholder={t(
                "register.section-page.contact-means.input.phone-text-place-holder"
              )}
              value={cellPhone}
              onChange={handleCellPhoneChange}
            />
          </div>

          <PageCounter currentSection={3} totalSections={5} />
          <button
            className=" text-white px-5 py-5 rounded-md mt-8 button-register"
            type="submit"
          >
            {t("register.section-page.contact-means.button.btn-primary")}
          </button>
          <button
            className="text-white px-5 py-5 rounded-md mt-8 button-register"
            type="button"
            onClick={handleVolverClick}
          >
            {t("register.section-page.contact-means.button.btn-secondary")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactMeans;
