import React, { MouseEventHandler, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./style.css";
import { getProfessions } from "@/api/professions";
import ProfesionService from "./service";
import { Character, Profession } from "@/model/model";
import Swal from "sweetalert2";
import Announcement from "./annoucement";

interface ProfessionsProps {
  character: Character;
  token: string;
  account_id: number;
}
interface ArrowProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
const Professions: React.FC<ProfessionsProps> = ({
  character,
  token,
  account_id,
}) => {
  const [professions, setPartners] = useState<Profession[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfession, setSelectedProfession] =
    useState<Profession | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const openModal = (profession: Profession) => {
    setSelectedProfession(profession);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProfession(null);
  };
  const handleAnnounce = (profession: Profession) => {
    setSelectedProfession(profession);
    setShowConfirmDialog(true);
  };

  const handleConfirmAnnounce = () => {
    Swal.fire({
      icon: "info",
      color: "white",
      background: "#0B1218",
      title: "¡Mensaje Enviado!",
      text: "Su mensaje será publicado en breve.",
      confirmButtonText: "Aceptar",
    }).then(() => {
      setShowConfirmDialog(false);
    });
  };

  const handleCancelAnnounce = () => {
    setShowConfirmDialog(false);
  };
  useEffect(() => {
    const fetchProfessions = async () => {
      try {
        const professions = await getProfessions(character.id, token);
        setPartners(professions);
      } catch (error) {
        console.error("Error fetching professions:", error);
      }
    };

    fetchProfessions();
  }, [character.id, token]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 2, // Número de slides a deslizar
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // Número de slides a deslizar
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // Número de slides a deslizar
    },
  };

  if (!professions || professions.length <= 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <p className="text-white text-3xl font-bold mb-4">
          ¡Explora nuevas habilidades!
        </p>
        <p className="text-white text-xl">
          Aún no has aprendido ninguna profesión. ¡Sumérgete en el mundo de
          World of Warcraft y descubre un sinfín de profesiones que te ayudarán
          a mejorar tu experiencia de juego! Conviértete en un maestro artesano,
          un herborista experto o un ingeniero innovador. ¡Las posibilidades son
          infinitas!
        </p>
      </div>
    );
  }

  return (
    <div className="professions-carousel-container">
      <div className="info-section mb-8 p-4 rounded-lg">
        <p className="text-gray-300 text-lg mb-4">
          <strong>¿Qué hacen los botones?</strong>
        </p>
        <p className="text-gray-300 text-lg mb-2">
          <strong>Publicar:</strong> Al hacer clic en este botón, podrás
          <strong> publicar tu profesión en la web.</strong> Esto permitirá que
          otros jugadores vean y conozcan tus habilidades y servicios.
        </p>
        <p className="text-gray-300 text-lg">
          <strong>Anunciarme:</strong> Al hacer clic en este botón, se enviará
          un mensaje dentro del servidor. Esto es útil para alertar a otros
          jugadores sobre tus habilidades o servicios en el juego.
        </p>
      </div>
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        showDots={false}
        arrows={true}
        infinite={true}
        autoPlay={false}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="carousel-slide"
        containerClass="carousel-container"
        renderButtonGroupOutside={true}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
        {professions.map((profession) => (
          <div key={profession.name} className="carousel-slide select-none ">
            <div className=" shadow-md p-10 rounded-lg">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 md:mr-6">
                  <div className="w-64 h-64 flex justify-center items-center overflow-hidden rounded-full bg-gray-500">
                    <img
                      src={profession.logo}
                      alt={profession.name}
                      draggable="false"
                      className="w-full h-full object-cover"
                      style={{
                        borderRadius: "50%",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
                <div className="md:w-1/2 ml-4">
                  <p className="text-gray-300 text-lg font-bold mb-2">
                    {profession.name}
                  </p>
                  <p className="text-gray-300"> lvl: {profession.value}</p>
                  <p className="text-gray-300"> Max: {profession.max}</p>

                  <div className="text-gray-300 text-lg mb-4">
                    {profession.service &&
                    profession.service.description.length > 300
                      ? `${profession.service.description.substring(0, 300)}...`
                      : ""}
                  </div>
                  <div className="flex items-center mb-4">
                    {Array.from({ length: Math.floor(1) }, (_, index) => (
                      <span key={index} className="text-yellow-400 text-xl">
                        &#9733;
                      </span>
                    ))}
                    {Array.from({ length: 5 - Math.floor(1) }, (_, index) => (
                      <span key={index} className="text-gray-400 text-xl">
                        &#9733;
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-300 text-lg mb-4">
                      Administrar servicios
                    </p>
                    {profession.service == null ? (
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none mb-2 md:mb-0"
                        onClick={() => openModal(profession)}
                      >
                        Publicar
                      </button>
                    ) : (
                      <button
                        onClick={() => openModal(profession)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                      >
                        Editar
                      </button>
                    )}{" "}
                    <button
                      onClick={() => handleAnnounce(profession)}
                      className="bg-violet-700 text-white px-4 py-2 rounded-lg hover:bg-violet-800 mt-3 focus:outline-none"
                    >
                      Anunciarme
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
      {showConfirmDialog && selectedProfession && (
        <Announcement
          cost={1000}
          characterId={character.id}
          skillId={selectedProfession.id}
          accountId={account_id}
          token={token}
          onConfirm={handleConfirmAnnounce}
          onCancel={handleCancelAnnounce}
        />
      )}
      {selectedProfession && (
        <ProfesionService
          isOpen={isModalOpen}
          is_public={
            selectedProfession.service != null &&
            selectedProfession.service.is_public
          }
          exist_services={selectedProfession.service != null}
          token={token}
          character_id={character.id}
          skill_id={selectedProfession.id}
          account_id={account_id}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

const CustomLeftArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="custom-arrow custom-arrow-left"
      aria-label="Previous Slide"
    >
      &#8592;
    </button>
  );
};

const CustomRightArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="custom-arrow custom-arrow-right"
      aria-label="Next Slide"
    >
      &#8594;
    </button>
  );
};

export default Professions;
