"use client";

import React from "react";
import "./style.css";
import Searcher from "../search/searcher";
import Link from "next/link";
import NavbarAuth from "./auth";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const handleSearch = (query: string) => {
    console.log("Buscar:", query);
  };

  const { t, i18n } = useTranslation();

  return (
    <div className="navbar contenedor">
      <header>
        <Link className="logo-home" href="/">
          <img
            className="nav-small-image"
            src="./img/logos/logo.png"
            alt="Logo Primary World Of Warcraft"
          />
          <p className="title-server title-home">Wow Libre</p>
        </Link>
      </header>
      <div className="searcher">
        <Searcher onSearch={handleSearch}></Searcher>
      </div>
      <div className="promotion">
        <a href="nav-promotion">
          <img
            className="image-promotion"
            src="./img/homes/promotion.png"
            alt=""
          />
        </a>
      </div>
      <div className="nav-ubication">
        <a className="text-white">{t("navbar.language")}</a>
      </div>
      <div className="nav-category">
        <nav className="category">
          <Link className="category-link" href="/guild">
            Hermandades
          </Link>
          <Link className="category-link" href="/comunity">
            Comunidad
          </Link>
          <Link className="category-link" href="/comunity">
            Banco
          </Link>
          <Link className="category-link" href="/comunity">
            Tienda
          </Link>

          <Link className="category-link" href="/help">
            Ayuda
          </Link>
        </nav>
      </div>
      <div className="auth relative">
        <NavbarAuth />
      </div>
    </div>
  );
};

export default Navbar;
