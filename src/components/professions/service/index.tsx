import React, { useState } from "react";
import "./style.css"; // Asegúrate de tener este archivo CSS

interface GuildCharacterProps {
  isOpen: boolean;
  is_public: boolean;
  exist_services: boolean;
  token: string;
  character_id: number;
  skill_id: number;
  account_id: number;
  onClose: () => void;
}

const ProfesionService: React.FC<GuildCharacterProps> = ({
  isOpen,
  exist_services,
  is_public,
  onClose,
}) => {
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(is_public);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ description, isPublic });
    onClose();
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-4xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white focus:outline-none text-2xl"
        >
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4 text-gray-300">
            Información del Servicio
          </h2>
          <p className="text-2xl font-bold mb-4  text-gray-300">
            Costo: <span className="text-yellow-500">600 g</span>
          </p>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-lg font-bold mb-2"
              htmlFor="description"
            >
              Mensaje
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-gray-900 rounded-lg focus:outline-none"
              rows={2}
              maxLength={50}
            />
            <p className="text-gray-500 text-sm mt-1">
              {50 - description.length} caracteres restantes
            </p>
          </div>
          <div className="mb-4 flex items-center">
            <div className="switch-container">
              <span className="switch-label-text text-gray-300">
                Hacer público
              </span>
              <div className="switch">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  id="switch"
                />
                <label htmlFor="switch" className="switch-label"></label>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
              {exist_services ? "Actualizar" : "Crear Servicio"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default ProfesionService;
