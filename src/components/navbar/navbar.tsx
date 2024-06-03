import React from "react";
import "./style.css";
import Searcher from "../search/searcher";
import Link from "next/link";
import NavbarAuth from "./auth";

const Navbar = () => {
  const handleSearch = (query: string) => {
    console.log("Buscar:", query);
  };

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
        <a className="text-white">
          Ingrese tu <br />
          ubicación
        </a>
      </div>
      <div className="nav-category">
        <nav className="category">
          <a className="category-link" href="#">
            Categorias
          </a>
          <a className="category-link" href="#">
            Comunidad
          </a>
          <a className="category-link" href="#">
            Historial
          </a>
          <a className="category-link" href="#">
            Vender
          </a>

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
