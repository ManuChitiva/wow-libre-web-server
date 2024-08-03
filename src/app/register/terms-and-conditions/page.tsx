"use client";

import PageCounter from "@/components/register/counter";
import TitleWow from "@/components/title";
import React, { ChangeEvent, useEffect, useState } from "react";
import "../style.css";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import NavbarMinimalist from "@/components/navbar-minimalist";
import { useTranslation } from "react-i18next";
import { useUserContext } from "@/context/UserContext";

const TermsAndConditions = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { user } = useUserContext();

  const [selectedOptions, setSelectedOptions] = useState({
    option1: false,
    option2: false,
  });

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSelectedOptions({
      ...selectedOptions,
      [name]: checked,
    });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedOptions.option1 || !selectedOptions.option2) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("register.error.terms-and-conditions-empty"),
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }
    router.push("/register/account-web");
  };

  const handleAcceptClick = () => {
    router.push("/register/terms-and-conditions/readme");
  };

  const handleVolverClick = () => {
    router.back();
  };

  useEffect(() => {
    if (user) {
      i18n.changeLanguage(user.language);
    }
  }, [user]);

  return (
    <div className="contenedor register">
      <NavbarMinimalist />

      <div className="register-container">
        <TitleWow
          title={t("register.title-server-sub-title")}
          description={t(
            "register.section-page.terms-and-conditions.title-server-message"
          )}
        />

        <form className="register-container-form" onSubmit={handleFormSubmit}>
          <div className="form-group-flex-row">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="option1"
                name="option1"
                checked={selectedOptions.option1}
                onChange={handleCheckboxChange}
                className="checkbox-custom"
              />
              <label
                htmlFor="option1"
                className="pt-9 register-container-form-label text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl"
              >
                {t(
                  "register.section-page.terms-and-conditions.input.email-check-text"
                )}
              </label>
            </div>
          </div>

          <div className="form-group-flex-row mb-11">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="option2"
                name="option2"
                checked={selectedOptions.option2}
                onChange={handleCheckboxChange}
                className="checkbox-custom"
              />
              <label
                htmlFor="option2"
                className="pt-10 register-container-form-label text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl"
              >
                {t(
                  "register.section-page.terms-and-conditions.input.term-check-text"
                )}
                <a
                  onClick={handleAcceptClick}
                  href="/register/terms-and-conditions/readme"
                  className="underline"
                >
                  {t(
                    "register.section-page.terms-and-conditions.input.term-check-link"
                  )}
                </a>
              </label>
            </div>
          </div>

          <PageCounter currentSection={4} totalSections={5} />
          <button
            className="text-white px-5 py-5 rounded-md mt-8 button-register"
            type="submit"
          >
            {t("register.section-page.terms-and-conditions.button.btn-primary")}
          </button>
          <button
            className="text-white px-5 py-5 rounded-md mt-8 button-register"
            type="button"
            onClick={handleVolverClick}
          >
            {t(
              "register.section-page.terms-and-conditions.button.btn-secondary"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TermsAndConditions;
