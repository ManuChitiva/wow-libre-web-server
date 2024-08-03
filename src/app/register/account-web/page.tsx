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
import { useTranslation } from "react-i18next";
import LoadingSpinner from "@/components/loading-spinner";

const AccountWeb = () => {
  const { user, setUser } = useUserContext();
  const language = user.language;
  const country = user.country;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { t } = useTranslation();

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
        text: t("register.error.password-web-no-matches"),
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
        text: t("register.error.password-web-empty"),
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
        text: t("register.error.password-web-empty"),
        color: "white",
        background: "#0B1218",
        timer: 43500,
      });
      return;
    }
    setIsSubmitting(true);

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
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
        background: "#0B1218",
        timer: 4500,
      });
      return;
    } finally {
      setIsSubmitting(false);
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
          title={t("register.title-server-sub-title")}
          description={t(
            "register.section-page.account-web.title-server-message"
          )}
        />
        <form
          className="register-container-form pt-5"
          onSubmit={handleFormSubmit}
        >
          <div className="hidden">
            <label
              htmlFor="usernameInput"
              className="mb-2 register-container-form-label"
            >
              Username
            </label>
            <input
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              type="text"
              id="usernameInput"
              placeholder="Username"
              value={user.username}
              readOnly
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="passInput"
              className="mb-2 register-container-form-label"
            >
              {t("register.section-page.account-web.input.password-web-text")}
            </label>

            <input
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              type="password"
              id="passInput"
              placeholder={t(
                "register.section-page.account-web.input.password-web-placeholder"
              )}
              value={password}
              required
              autoComplete="new-password"
              onChange={handlePasswordChange}
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="confirmPassInput"
              className="mb-2 register-container-form-label"
            >
              {t(
                "register.section-page.account-web.input.password-confirm-web-text"
              )}
            </label>
            <input
              className="mb-3 px-4 py-2 border rounded-md text-black register-input"
              type="password"
              id="confirmPassInput"
              autoComplete="new-password"
              placeholder={t(
                "register.section-page.account-web.input.password-confirm-web-text-placeholder"
              )}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          {isSubmitting && (
            <div className="mb-4 text-center">
              <LoadingSpinner />
            </div>
          )}
          <PageCounter currentSection={5} totalSections={5} />
          <button
            className=" text-white px-5 py-5 rounded-md mt-8 button-register"
            type="submit"
          >
            {t("register.section-page.account-web.button.btn-primary")}
          </button>
          <button
            className="text-white px-5 py-5 rounded-md mt-8 button-register"
            type="button"
            onClick={handleVolverClick}
          >
            {t("register.section-page.account-web.button.btn-secondary")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountWeb;
