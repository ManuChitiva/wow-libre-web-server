import Link from "next/link";
import React from "react";
import "./style.css";

const NavbarMinimalist = () => {
  return (
    <header className="nav-minimalist-header">
      <Link className="nav-minimalist-logo" href="/">
        <img
          className="nav-minimalist-img"
          src="/img/logos/logo.png"
          alt="Logo Primary World Of Warcraft"
        />
        <p className="nav-minimalist-logo-title title-server">Wow Libre</p>
      </Link>

      <div>
        <Link className="nav-minimalist-help" href="/help">
          <p className="text-white text-3xl mr-6 pt-4 title-server">Support</p>
          <img
            className="nav-minimalist-help-img"
            src="/img/icons/help.png"
            alt="Icon Help"
          />
        </Link>
      </div>
    </header>
  );
};

export default NavbarMinimalist;
