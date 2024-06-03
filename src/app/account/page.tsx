"use client";
import NavbarMinimalist from "@/components/register/navbar";
import React, { useEffect, useState } from "react";
import "./style.css";
import Link from "next/link";
import { getAccounts } from "@/api/account";
import Cookies from "js-cookie";
import { AccountsModel } from "@/model/model";
import LoadingSpinner from "@/components/loading-spinner";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Accounts = () => {
  const jwt = Cookies.get("token");
  const [accounts, setAccounts] = useState<AccountsModel[]>();
  const [disableBtn, setDisableBtn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAccounts = await getAccounts(jwt || "");
        setAccounts(fetchedAccounts);
        if (fetchedAccounts.length >= 10) {
          setDisableBtn(true);
        }
        setLoading(false);
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message, // Imprimir el mensaje de error
          color: "white",
          background: "#0B1218",
          timer: 4500,
        });
        setLoading(true);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return (
      <div className=" contenedor mx-auto ">
        <NavbarMinimalist />
        <div className="flex items-center justify-center mt-5 ">
          <div className="empty-table-message mb-4">
            <div className="content mb-48">
              <img
                src="/img/profile/create-account.png"
                alt="World of Warcraft Logo"
                className="logo"
              />
              <p className="mb-5">
                No es posible obtener el detalle de tus cuentas en este momento,
                por favor espera.
              </p>
              <LoadingSpinner />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="contenedor mx-auto">
      <NavbarMinimalist />
      <div className="mt-10">
        <h2 className="title">
          ¡Administra tus cuentas en el mundo de Azeroth!
        </h2>
        <p className="description">
          Explora tus datos, gestiona tus personajes y más en el emocionante
          universo de World of Warcraft con Wow Libre.
        </p>
      </div>
      <div className="table-container mt-4">
        {accounts && accounts.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Usuario</th>
                <th>Expansion</th>
                <th>Online</th>
                <th>Login Fallidos</th>
                <th>Ultima Conexion</th>
                <th>Ultima Ip</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.username}</td>
                  <td>{row.expansion}</td>
                  <td>{row.online ? "Activo" : "Desconectado"}</td>
                  <td>{row.failed_logins}</td>
                  <td>{row.join_date}</td>
                  <td>{row.last_ip}</td>
                  <td>
                    <button
                      className="administrar-btn"
                      onClick={() =>
                        router.push(`/account/detail?id=${row.id}`)
                      }
                    >
                      Administrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <Link className="administrar-btn mt-10" href="/register/username">
              Crear cuenta de juego
            </Link>
          </table>
        ) : (
          <div className="empty-table-message">
            <div className="content">
              <img
                src="/img/profile/create-account.png"
                alt="World of Warcraft Logo"
                className="logo"
              />

              <p className="mb-5">
                No hay cuentas registradas. ¡Crea una cuenta de juego ahora!
              </p>
              {accounts && accounts.length <= 10 && (
                <Link className="create-account-btn" href="/register/username">
                  Crear una cuenta
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accounts;
