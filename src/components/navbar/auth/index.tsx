import Link from "next/link";
import React, { useEffect, useState } from "react";
import "../style.css";
import { UserModel, useUserContext } from "@/context/UserContext";
import DropDown from "../dropdown";
import LoadingSpinner from "@/components/loading-spinner";

const NavbarAuth = () => {
  const { user, clearUserData } = useUserContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    setIsLoggedIn(user.logged_in);
    setIsLoading(false);
  }, [user]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <nav className="nav-auth relative">
      {!isLoggedIn && (
        <>
          <Link className="nav-auth-category" href="/login">
            Ingresa
          </Link>
          <Link className="nav-auth-category" href="/register">
            Crea tu cuenta
          </Link>
        </>
      )}

      {isLoggedIn && (
        <>
          <Link className="nav-auth-category" href="/purchases">
            Mis Compras
          </Link>
          <Link className="nav-auth-category" href="/purchases">
            Otros
          </Link>

          <button className="nav-auth-category" onClick={toggleDropdown}>
            <div className="w-10 h-10 rounded-full overflow-hidden ">
              <img
                src={user.avatar}
                alt="Perfil"
                className="w-full h-full object-cover"
              />
            </div>
          </button>
        </>
      )}

      {showDropdown && (
        <div className="absolute top-full mt-2 right-0">
          <DropDown user={user} clearUserData={clearUserData} />
        </div>
      )}
    </nav>
  );
};

export default NavbarAuth;
