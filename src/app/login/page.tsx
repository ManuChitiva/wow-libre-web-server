"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import "./style.css";
import Link from "next/link";
import { login } from "@/api/account/login";
import Cookies from "js-cookie";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "@/components/loading-spinner";

const Login = () => {
  const { t, i18n } = useTranslation();
  const jwt = Cookies.get("token");

  const { user, setUser } = useUserContext();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  if (user.logged_in && jwt != null) {
    router.push("/accounts");
  }

  useEffect(() => {
    i18n.changeLanguage(user.language);
  }, [user.language, i18n]);

  const handleUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userName.trim() && !password.trim()) {
      Swal.fire({
        icon: "warning",
        title: t("login.error.empty-field-title"),
        text: t("login.error.empty-field-message"),
        confirmButtonColor: "#3085d6",
        confirmButtonText: t("login.error.empty-field-buttom-message"),
        timer: 4500,
      });
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await login(userName, password);
      const { jwt, refresh_token, expiration_date, avatar_url } = response;
      const expirationDateUTC = new Date(expiration_date).toUTCString();

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

      if (user) {
        setUser({
          ...user,
          logged_in: true,
          avatar: avatar_url,
        });
      }

      router.push("/account");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("login.error.authentication-message"),
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-banner">
        <img
          src="https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/bltbe1582ef1691da64/653ad22f23ad6fdfc530381c/WoW_11.0_PreSaleSupportAssets_Bnet_CheckoutThumbnail_960x540_B06.png?imwidth=1920&imdensity=2.625"
          alt="Img Login Wow"
        />
      </div>
      <div className="login-form">
        <div className="login-form-btn-back text-xl md:text-4xl lg:text-5xl xl:text-5xl">
          <a href="/">X</a>
        </div>
        <div className="login-form-section-primary">
          <h2 className="font-semibold text-3xl md:text-6xl lg:text-6xl xl:text-6xl">
            {t("login.title")}
          </h2>
        </div>
        <div className="login-form-section-register">
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="username" className="mb-2">
              {t("login.username")}
            </label>
            <input
              className="mb-4 px-4 py-2 border rounded-md text-black"
              type="text"
              id="username"
              placeholder="Username"
              autoComplete="username"
              onChange={handleUserNameChange}
            />
            <label htmlFor="password" className="mb-2">
              {t("login.password")}
            </label>
            <input
              className="mb-4 px-4 py-2 border rounded-md text-black"
              type="password"
              id="password"
              autoComplete="password"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
            {isSubmitting && (
              <div className="mb-4 text-center">
                <LoadingSpinner />
              </div>
            )}
            <button
              className="bg-blue-500 text-white px-3 py-2 rounded-md mt-8 login-form-section-register-buttom"
              type="submit"
            >
              {t("login.buttom")}
            </button>
          </form>
          <div className="login-form-section-question mt-2">
            <p>
              {t("login.create-account-question")}
              <Link className="register-link" href="/register">
                {t("login.create-account-message")}
              </Link>
            </p>

            <p>
              <a className=" hover:text-orange-300" href="#">
                {t("login.old-password")}
              </a>
            </p>
          </div>
          <div className="login-form-section-footer pt-2">
            <div className="mt-28 text-xl md:text-1xl lg:text-2xl xl:text-2xl">
              <p>
                World of Warcraft® and Blizzard Entertainment® are all
                trademarks or registered trademarks of Blizzard Entertainment in
                the United States and/or other countries. These terms and all
                related materials, logos, and images are copyright © Blizzard
                Entertainment. This site is in no way associated with or
                endorsed by Blizzard Entertainment®.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
