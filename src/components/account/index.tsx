import { UserModel } from "@/context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  faSave,
  faTimes,
  faEdit,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { AccountDetailDto } from "@/model/model";
import { changePasswordGame } from "@/api/account/change-password";

const crypto = require("crypto");

interface ProfileSecurityProps {
  account: AccountDetailDto;
  token: string;
}

const DetailAccount = ({ account, token }: ProfileSecurityProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { computeVerifier, params } = require(`trinitycore-srp6`);
  const [passwordWeb, setPasswordWeb] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEditOtp = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordWeb(event.target.value);
  };

  const handleEditPasswordInGame = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = async () => {
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Las contraseñas no coinciden",
        text: "Por favor, verifique que las contraseñas coincidan.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Entendido",
      });
      return;
    }

    if (!password.trim()) {
      Swal.fire({
        icon: "warning",
        title: "La contraseña es vacia",
        text: "Por favor, verifique  que la contraseña no este vacia.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Entendido",
      });
      return;
    }

    if (password.trim().length < 5 || password.trim().length > 30) {
      Swal.fire({
        icon: "warning",
        title: "Contraseña invalida",
        text: "Por favor, verifique que la contraseña sea mayor a 5 caracteres e inferior a 30 caracteres.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Entendido",
      });
      return;
    }

    const salt = crypto.randomBytes(32);

    const verifier = computeVerifier(
      params.trinitycore,
      Buffer.from(salt),
      account.username.toUpperCase(),
      password.toUpperCase()
    );

    const userSecurity = {
      salt: Buffer.from(salt).toString("hex"),
      verifier: Buffer.from(verifier).toString("hex"),
      password: passwordWeb,
      account_id: account.id,
    };

    try {
      await changePasswordGame(userSecurity, token);

      Swal.fire({
        icon: "success",
        title: "Contraseña actualizada",
        text: "La contraseña ha sido actualizada con exito.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Entendido",
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ha ocurrido un error inesperado",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Entendido",
      });
    }
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="mx-auto mt-8 text-white">
      <div className="text-center mx-auto mt-8 max-w-2xl">
        <div className="text-center">
          <h2 className="font-bold text-2xl">Estado actual de la cuenta</h2>
          <h3
            className={`text-xl font-semibold m-2 ${
              account.account_banned && account.account_banned.active
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {account.account_banned ? "Inhabilitada" : "Disponible"}
          </h3>

          {account.account_banned && account.account_banned.active && (
            <div className="grid grid-cols-2 gap-8 text-2xl">
              <p className="text-gray-400 m-2 font-semibold">
                Fecha del bloqueo:
                <br />
                <span className="text-lg ml-2">
                  {account.account_banned.bandate}
                </span>
              </p>
              <p className="text-gray-400 m-2 font-semibold text-md">
                Fecha de desbloqueo:
                <br />
                <span className="ml-2 text-lg">
                  {account.account_banned.unbandate}
                </span>
              </p>
              <div className="col-span-2">
                <p className="text-gray-400 m-2 font-semibold text-2xl">
                  Ha sido baneado por el GM : <br />
                  <span className="text-red-500 ml-2 text-2xl ">
                    {account.account_banned.banned_by}
                  </span>
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-400 m-2 font-semibold text-2xl ">
                  Motivo :<br />
                  <span className="text-gray-400 ml-2 text-lg break-words">
                    {account.account_banned.ban_reason.length > 60
                      ? `${account.account_banned.ban_reason.substring(
                          0,
                          60
                        )}...`
                      : account.account_banned.ban_reason}
                  </span>
                </p>
              </div>
            </div>
          )}

          {account.mute && (
            <div className="grid grid-cols-2 gap-8">
              <p className="text-gray-400 m-4 font-semibold text-xl">
                Ha sido silenciado por el GM : <br />
                <span className="text-red-500 ml-2 text-2xl">
                  {account.mute_by}
                </span>
              </p>
              <p className="text-gray-400 m-4 font-semibold  text-2xl">
                Razón del muteo:
                <br />
                <span className="text-gray-500 m-2 text-lg">
                  {account.mute_reason}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
      <hr className="border-t-1 border-gray-300 my-4 mx-8" />
      <div className="text-center mx-auto mt-8 max-w-2xl">
        <h2 className="mb-5 font-bold text-xl text-gray-400">
          Fortalece las defensas de tu reino digital con una contraseña sólida y
          segura. Sé el protagonista de tu epopeya en World of Warcraft,
          resguardando tus tesoros virtuales con una llave impenetrable.
        </h2>
      </div>
      <div className="px-8 pt-6 pb-8 mb-9 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <div className="mb-4">
            <label className="block text-xl font-bold mb-2">
              Contraseña web
              <span className="text-blue-500 ml-2">
                <FontAwesomeIcon icon={faInfoCircle} />
              </span>
            </label>
            {!isEditing ? (
              <div className="flex items-center">
                <span className="mr-2">*********</span>
                <button
                  onClick={handleEditClick}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-2" />
                  Editar
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Ingrese su contraseña web"
                    onChange={handleEditOtp}
                    className="border rounded py-2 px-3  text-gray-700 text-2xl focus:outline-none focus:ring focus:border-blue-500"
                  />
                </div>
                <p className="text-white text-lg mt-2">
                  Ingresa la contraseña de tu cuenta web para <br /> confirmar
                  los cambios.
                </p>
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block x text-xl font-bold mb-2">
              Nueva Contraseña
            </label>
            {!isEditing ? (
              <div className="flex items-center">
                <span className="mr-2">*******</span>
              </div>
            ) : (
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Ingrese su nueva contraseña"
                  onChange={handleEditPasswordInGame}
                  className="border rounded py-2 px-3 text-2xl text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block  text-xl font-bold mb-2">
              Confirmar Contraseña
            </label>
            {!isEditing ? (
              <div className="flex items-center">
                <span className="mr-2">*******</span>
              </div>
            ) : (
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Confirme su nueva contraseña"
                  onChange={handleConfirmPassword}
                  className="border rounded py-2 px-3 text-2xl text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSaveClick}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:ring focus:border-blue-300"
            >
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              Actualizar
            </button>
            <button
              onClick={handleCancelClick}
              className="bg-gray-600 hover:bg-gray-500 font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-gray-600 "
            >
              <FontAwesomeIcon icon={faTimes} className="mr-2" />
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailAccount;
