import { Character, Profession } from "@/model/model";
import React, { MouseEventHandler, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./style.css";
import { getProfessions } from "@/api/professions";

interface ProfessionsProps {
  character: Character;
  token: string;
  account_id: string;
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
          <div
            key={profession.name}
            className="carousel-slide select-none cursor-pointer"
          >
            <div className="mt-5 shadow-md p-10 rounded-lg">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 md:mr-6">
                  <div className="md:w-1/2 md:mr-6">
                    <div className="w-80 h-80 flex justify-center items-center overflow-hidden rounded-full bg-gray-800">
                      <img
                        src={profession.logo}
                        alt={profession.name}
                        draggable="false"
                        className="w-full h-full object-cover "
                      />
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
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
                    {profession.service == null ? (
                      <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none mr-20">
                        Publico
                      </button>
                    ) : profession.service.is_public ? (
                      <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none mr-20">
                        Publico
                      </button>
                    ) : !profession.service.is_public ? (
                      <button className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none mr-20">
                        Privado
                      </button>
                    ) : null}
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none mt-2 mr-20">
                      Editar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
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
