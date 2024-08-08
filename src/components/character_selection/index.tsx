import React, { useState } from "react";
import { Character } from "@/model/model";
import DisplayMoney from "../money";

interface CharacterSelectionProps {
  characters: Character[];
  onSelectCharacter: (character: Character) => void;
}

const CharacterSelection: React.FC<CharacterSelectionProps> = ({
  characters,
  onSelectCharacter,
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  if (characters.length === 0) {
    return <p>No hay personajes disponibles</p>;
  }

  const handleCharacterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCharacterId = parseInt(e.target.value, 10);
    const selectedChar = characters.find(
      (character) => character.id === selectedCharacterId
    );

    if (selectedChar) {
      setSelectedCharacter(selectedChar);
      onSelectCharacter(selectedChar);
    }
  };

  return (
    <div>
      <select
        style={{
          border: "none",
          outline: "none",
          boxShadow: "none",
        }}
        className="text-white bg-transparent"
        onChange={handleCharacterChange}
        defaultValue=""
      >
        <option value="" disabled>
          Seleccione un personaje
        </option>
        {characters.map((character) => (
          <option
            key={character.id}
            value={character.id}
            className="text-gray-500"
          >
            {character.name} - Nivel {character.level}
          </option>
        ))}
      </select>
      {selectedCharacter && <DisplayMoney money={selectedCharacter.money} />}
    </div>
  );
};

export default CharacterSelection;
