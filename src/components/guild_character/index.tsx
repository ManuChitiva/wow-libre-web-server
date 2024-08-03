"use client";
import { getAccounts } from "@/api/account";
import { getCharacters } from "@/api/account/character";
import { attach } from "@/api/guilds";
import { AccountsModel, Character } from "@/model/model";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface GuildCharacterProps {
  isOpen: boolean;
  token: string;
  guild_id: string;
  onClose: () => void;
}

const GuildCharacter: React.FC<GuildCharacterProps> = ({
  isOpen,
  token,
  guild_id,
  onClose,
}) => {
  const [accounts, setAccounts] = useState<AccountsModel[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(
    null
  );
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false); // Añade un estado para el estado de carga si es necesario

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAccounts = await getAccounts(token);
        setAccounts(fetchedAccounts);
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Por favor intente más tarde, el servicio no se encuentra disponible.",
          color: "white",
          background: "#0B1218",
          timer: 4500,
        });
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen, token]);

  const handleAccountChange = async (accountId: number) => {
    setSelectedAccountId(accountId);
    setSelectedCharacterId(null);

    try {
      const fetchedCharacters = await getCharacters(
        token,
        accountId.toString()
      );
      setCharacters(fetchedCharacters.characters);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se pudieron obtener los personajes de la cuenta seleccionada.",
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
    }
  };

  const handleCharacterChange = async (characterId: number) => {
    setSelectedCharacterId(characterId);
  };

  const handleJoinGuild = async () => {
    if (!selectedAccountId || !selectedCharacterId) {
      return;
    }

    setLoading(true);

    try {
      await attach(
        guild_id,
        selectedAccountId.toString(),
        selectedCharacterId.toString(),
        token
      );
      Swal.fire({
        icon: "success",
        title: "Guild Success",
        text: "Vinculacion exitosa",
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
        color: "white",
        background: "#0B1218",
        timer: 4500,
      });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-midnight rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-200">
          Seleccion de personajes
        </h2>
        <p className=" text-gray-400">
          Seleciona el personaje al cual deseas vincular
        </p>

        <select
          onChange={(e) => handleAccountChange(Number(e.target.value))}
          value={selectedAccountId || ""}
          className="mt-4 px-4 py-2  bg-transparent text-gray-300 rounded"
        >
          <option value="" disabled>
            Selecciona una cuenta
          </option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.username}
            </option>
          ))}
        </select>

        {/* Selector de personajes */}
        {selectedAccountId && (
          <select
            onChange={(e) => handleCharacterChange(Number(e.target.value))}
            value={selectedCharacterId || ""}
            className="mt-4 px-4 py-2  rounded bg-transparent text-gray-300"
          >
            <option value="" disabled>
              Selecciona un personaje
            </option>
            {characters.map((character) => (
              <option
                className="text-black"
                key={character.id}
                value={character.id}
              >
                {character.name}
              </option>
            ))}
          </select>
        )}

        {/* Botones */}
        <div className="flex mt-4">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 bg-red-900 text-white rounded mr-2"
          >
            Cancelar
          </button>
          <button
            onClick={handleJoinGuild}
            disabled={!selectedAccountId || !selectedCharacterId || loading}
            className={`flex-1 px-4 py-2 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-800"
            } text-white rounded ml-2`}
          >
            {loading ? "Uniendo..." : "Unirme"}
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default GuildCharacter;
