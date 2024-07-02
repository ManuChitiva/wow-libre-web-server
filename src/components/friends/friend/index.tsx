import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import FriendDetail from "../detail";
import { Character, Friends } from "@/model/model";
import { getFriends } from "@/api/account/character";

interface CharacterProps {
  character: Character;
  token: string | null;
  account_id: string;
}

const Friend: React.FC<CharacterProps> = ({ character, token, account_id }) => {
  const [friendsModel, setFriends] = useState<Friends | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState<Character | null>(); // Nuevo estado

  const openModal = (friend: Character) => {
    setSelectedFriendId(friend);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (character && token) {
          const response: Friends = await getFriends(
            token,
            character.id,
            account_id
          );
          setFriends(response);
        }
      } catch (error) {
        console.error("Error al obtener amigos:", error);
        setFriends(null);
      }
    };

    fetchData();
  }, [character]);

  if (!character || character == null) {
    return <p>Selecciona un personaje para mostrar detalles.</p>;
  }

  if (!friendsModel || friendsModel.friends.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <p className="text-white text-x2 font-semibold mb-2">
          ¡Oh no! No tienes amigos.
        </p>
        <p className="text-white text-x1">
          Parece que aún no has agregado amigos a tu lista. Conéctate con otros
          aventureros para comenzar a construir tu red social en el juego.
        </p>
      </div>
    );
  }

  // Número de elementos por página
  const itemsPerPage = 3;

  // Calcula el índice del primer y último elemento en la página actual
  const indexOfLastFriend = (currentPage + 1) * itemsPerPage;
  const indexOfFirstFriend = indexOfLastFriend - itemsPerPage;
  const currentFriends = friendsModel.friends.slice(
    indexOfFirstFriend,
    indexOfLastFriend
  );

  const handlePageClick = (data: { selected: number }) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  return (
    <div className="p-4 ">
      <h2 className="text-2xl font-semibold mb-4 text-white ">
        Lista de Amigos
      </h2>
      <div className="grid grid-cols-3 gap-4 ">
        {currentFriends.map((friend) => (
          <div
            key={friend.id}
            className=" rounded-2xl shadow-2xl border border-gray-600 p-4 overflow-hidden cursor-pointer"
            onClick={() => openModal(friend)} // Pasa el ID del amigo al hacer clic
          >
            <img
              src="https://via.placeholder.com/50"
              alt={`Avatar de ${friend.name}`}
              className="w-20 h-20 rounded-full mx-auto mb-2"
            />
            <div className="text-center">
              <h3 className="pt-2 text-3xl font-semibold text-white">
                {friend.name}
              </h3>
            </div>
            <p className="text-white overflow-hidden overflow-ellipsis whitespace-nowrap">
              Nivel: {friend.level}
            </p>
            <p className="text-white  overflow-hidden overflow-ellipsis whitespace-nowrap">
              Clase: {friend.class}
            </p>
            <p className="text-white overflow-hidden overflow-ellipsis whitespace-nowrap">
              Raza: {friend.race}
            </p>
            <p className="text-white  overflow-hidden overflow-ellipsis whitespace-nowrap">
              Estado: {friend.flags}
            </p>
            <p className="text-white  overflow-hidden overflow-ellipsis whitespace-nowrap">
              Nota: {friend.note}
            </p>
          </div>
        ))}
      </div>

      {isModalOpen && selectedFriendId !== null && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-slate-200 rounded-2xl  p-4 relative">
              <button
                className="absolute top-0 right-0 mt-2 mr-2 action-button text-black"
                onClick={closeModal}
              >
                &#10005;
              </button>
              <FriendDetail
                jwt={token || ""}
                character={character}
                friend={selectedFriendId || null}
                onCloseModal={closeModal}
              />
            </div>
          </div>
        </>
      )}

      <ReactPaginate
        forcePage={currentPage}
        previousLabel={"Anterior"}
        nextLabel={"Siguiente"}
        breakLabel={"..."}
        pageCount={Math.ceil(friendsModel.friends.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination flex justify-center mt-6"}
        pageClassName={"page-item inline-block mx-1"}
        pageLinkClassName={"page-link px-3 py-1 border-gray-300 rounded "}
        activeClassName={"active"}
        activeLinkClassName={"active-link  text-blue-200"}
        previousClassName={"inline-block mr-2"}
        previousLinkClassName={
          "previous-link px-3 py-1  border-gray-300 rounded text-white "
        }
        nextClassName={"inline-block ml-4"}
        nextLinkClassName={
          "next-link px-3 py-1  border-gray-300 rounded text-white "
        }
        breakClassName={"break-item"}
        breakLinkClassName={
          "break-link px-3 py-1 border border-gray-300 rounded text-gray-500"
        }
      />
    </div>
  );
};

export default Friend;
