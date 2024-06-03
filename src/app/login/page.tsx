"use client";

import React, { ChangeEvent, useState } from "react";
import "./style.css";
import Link from "next/link";
import { login } from "@/api/account/login";
import Cookies from "js-cookie";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Login = () => {
  const { user, setUser } = useUserContext();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  if (user.logged_in) {
    router.push("/account");
  }

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
        imageUrl:
          "https://static.actugaming.net/media/2022/07/world-of-warcraft-lich-king-classic-889x500.jpg",
        imageHeight: 200,
        title: "Error de Inicio de Sesión",
        text: "Por favor, complete todos los campos obligatorios para continuar.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Entendido",
        timer: 4500,
      });
      return;
    }

    try {
      const response = await login(userName, password);
      Cookies.set("token", response.jwt, { expires: 7 }); // Ajusta la expiración y la ruta según tus necesidades
      Cookies.set("refresh_token", response.refresh_token, { expires: 7 }); // Ajusta la expiración y la ruta según tus necesidades

      if (user) {
        setUser({
          ...user,
          username: userName,
          logged_in: true,
        });
      }

      router.push("/account");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se ha podido autenticarse",
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
    }
  };

  return (
    <div className="login-page">
      <div className="login-banner">
        <img
          src="https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/bltbe1582ef1691da64/653ad22f23ad6fdfc530381c/WoW_11.0_PreSaleSupportAssets_Bnet_CheckoutThumbnail_960x540_B06.png?imwidth=1920&imdensity=2.625"
          alt="Banner"
        />
      </div>
      <div className="login-form">
        <div className="login-form-btn-back text-xl md:text-4xl lg:text-5xl xl:text-5xl">
          <a href="/">X</a>
        </div>
        <div className="login-form-section-primary">
          <h2 className="font-semibold text-3xl md:text-6xl lg:text-6xl xl:text-6xl">
            Iniciar sesión
          </h2>
        </div>
        <div className="login-form-section-register">
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="username" className="mb-2">
              Ingresa tu username
            </label>
            <input
              className="mb-4 px-4 py-2 border rounded-md text-black"
              type="text"
              id="username"
              placeholder="Username"
              onChange={handleUserNameChange}
            />
            <label htmlFor="password" className="mb-2">
              Ingresa tu Password
            </label>
            <input
              className="mb-4 px-4 py-2 border rounded-md text-black"
              type="password"
              id="password"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
            <button
              className="bg-blue-500 text-white px-3 py-2 rounded-md mt-8 login-form-section-register-buttom"
              type="submit"
            >
              Iniciar sesión
            </button>
          </form>
          <div className="login-form-section-question mt-2">
            <p>
              ¿No tienes una cuenta?{" "}
              <Link className="register-link" href="/register">
                Crea tu cuenta
              </Link>
            </p>
            <p>
              <a href="#">¿Olvidaste tu contraseña?</a>
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
