import React, { ChangeEvent, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faStar,
  faTrashAlt,
  faEdit,
  faSortUp,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";

import Swal from "sweetalert2";
import { Character } from "@/model/model";
import { deleteFriend } from "@/api/account/character";

interface FriendsDetailProps {
  jwt: String | null;
  character: Character;
  friend: Character | null;
  onCloseModal: () => void; // Nueva prop
}

const FriendDetail: React.FC<FriendsDetailProps> = ({
  jwt,
  character,
  friend,
  onCloseModal,
}) => {
  if (friend == null) {
    return <p>Selecciona un personaje para mostrar detalles.</p>;
  }

  const [giftLevels, setGiftLevels] = useState(0);
  const [giftMoney, setGiftMoney] = useState(0);

  const [isGiftLevelsOpen, setIsGiftLevelsOpen] = useState(false);
  const [isGiftOroOpen, setIsMoneyIsOpen] = useState(false);

  const openGiftLevelsModal = () => {
    setIsGiftLevelsOpen(true);
  };

  const closeGiftLevelsModal = () => {
    setIsGiftLevelsOpen(false);
  };

  const openGiftMoneyOpenModal = () => {
    setIsMoneyIsOpen(true);
  };

  const deleteFriendInput = async () => {
    try {
      await deleteFriend(jwt || "", character.id, friend.id);
      Swal.fire({
        icon: "success",
        title: "Amigo Eliminado",
        text: "Tu amigo ha sido eliminado con éxito.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Entendido",
      });
      onCloseModal();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al Eliminar Amigo",
        text: "Ocurrió un error al intentar eliminar al amigo. Por favor, inténtalo de nuevo.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Entendido",
      });
      console.error("Error al eliminar amigo:", error);
    }
  };

  const closeGiftMoneyModal = () => {
    setIsMoneyIsOpen(false);
  };

  const handleGiftLevelsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGiftLevels(Number(event.target.value));
  };

  const handleGiftMoneyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGiftMoney(Number(event.target.value));
  };

  const handleGiftLevelsSubmit = () => {
    closeGiftLevelsModal();
  };

  const handleGiftMoneySubmit = () => {
    closeGiftMoneyModal();
  };

  return (
    <div className="friend-detail ">
      <div className="friend-detail-component ">
        <div className="mb-4 friend-detail-picture">
          <img
            src="https://via.placeholder.com/150"
            alt="Avatar del amigo"
            className="w-40 h-40 rounded-full m-20"
          />
        </div>
        <div className="friend-detail-container">
          <h2 className="text-xl font-semibold mb-2">{friend.name}</h2>
          <div className="text-gray-600">
            <p>Nivel {friend.level}</p>
            <p>Clase: {friend.class}</p>
            <p>Raza: {friend.race}</p>
            <p>Status: {friend.flags}</p>
          </div>
        </div>
        {friend.note && (
          <p className="text-gray-700 mb-4">Nota: {friend.note}</p>
        )}
        <div className="flex flex-col space-y-4">
          <button
            className="action-button bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-full transition duration-300"
            onClick={openGiftLevelsModal}
          >
            <FontAwesomeIcon icon={faSortUp} className="mr-2" />
            Regalar Niveles
          </button>
          <button
            className="action-button  bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-full transition duration-300"
            onClick={openGiftMoneyOpenModal}
          >
            <FontAwesomeIcon icon={faCoins} className="mr-2" />
            Enviar Oro
          </button>
          <button
            className="action-button bg-blue-500 hover:bg-blue-600  text-white py-1 px-2 rounded-full transition duration-300"
            onClick={deleteFriendInput}
          >
            <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
            Eliminar de Amigo
          </button>
        </div>
      </div>

      {isGiftLevelsOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center p-4">
              <label
                htmlFor="giftLevels"
                className="text-lg font-semibold mb-2 block"
              >
                Cantidad de Niveles:
              </label>
              <p className="mb-2">
                Precio:{" "}
                <span className="text-yellow-500 font-bold">500 Gold</span>
              </p>
              <p className="mb-2">
                Niveles Perdidos:{" "}
                <span className="text-red-500 font-bold">x2</span>
              </p>
              <p className="mb-4">
                Al regalar un nivel, perderás Oro. La cantidad de niveles que
                envíes se reducirá al doble. <br /> Por ejemplo, si regalas 4
                niveles, perderás 8 niveles y el equivalente en Oro.
              </p>
              <input
                type="number"
                id="giftLevels"
                value={giftLevels}
                onChange={handleGiftLevelsChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div className="flex justify-end">
              <button
                className="action-button bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-full transition duration-300"
                onClick={handleGiftLevelsSubmit}
              >
                Confirmar Regalo
              </button>
              <button
                className="action-button bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded-full transition duration-300 ml-2"
                onClick={closeGiftLevelsModal}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {isGiftOroOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <label
                htmlFor="giftMoney"
                className="text-lg font-semibold mb-2 block"
              >
                Cantidad de Oro:
              </label>
              <p>La cantidad de oro sera enviada por el correo del juego.</p>
              <input
                type="number"
                id="giftMoney"
                value={giftMoney}
                onChange={handleGiftMoneyChange}
                className="border border-gray-300 rounded-md p-2 w-full mb-4"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="action-button bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-full transition duration-300"
                onClick={handleGiftMoneySubmit}
              >
                Confirmar Regalo
              </button>
              <button
                className="action-button bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded-full transition duration-300 ml-2"
                onClick={closeGiftMoneyModal}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendDetail;
