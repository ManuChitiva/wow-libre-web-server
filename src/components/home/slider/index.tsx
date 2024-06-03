"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

export interface BenefitModel {
  id: number;
  profession: string;
  description: string;
  title: string;
  price: string;
  rating: number;
  background_image: string;
}

const SliderHome = () => {
  const partners: BenefitModel[] = [
    {
      id: 1,
      title: "DinoMkvr",
      profession: "Herrero",
      description:
        "lorem okdasokdaoskdok oaksdokasdkaoskdoakso dkasokdaskodkos",
      price: "24.500",
      rating: 4.5,
      background_image:
        "https://i.ibb.co/16MZH1b/openart-image-U0q-MOA8-D-1715448872483-raw.png", // Cambiado a una URL de imagen válida
    },
    {
      id: 2,
      title: "Stimblack",
      profession: "Joyero",
      description: "Joyero",
      price: "24.500",
      rating: 4.2,
      background_image:
        "https://i.ibb.co/tssPHCd/openart-image-5-SLn-QCib-1715448637386-raw.jpg", // Cambiado a una URL de imagen válida
    },
    {
      id: 3,
      title: "Chivto",
      profession: "Herrero",
      description: "Herrero",
      price: "24.500",
      rating: 4.5,
      background_image:
        "https://i.ibb.co/x1rfz3r/image-p-M3-Gnzxb-1715448233309-raw.jpg", // Cambiado a una URL de imagen válida
    },
    {
      id: 4,
      title: "Pimpoyo",
      profession: "Minero",
      description: "Minero",
      price: "24.500",
      rating: 1.5,
      background_image: "https://i.ibb.co/c3cfJzy/image0-0.jpg", // Cambiado a una URL de imagen válida
    },
    {
      id: 5,
      title: "Jifrmd",
      profession: "Herrero",
      description: "Herrero",
      price: "24.500",
      rating: 5.5,
      background_image:
        "https://i.ibb.co/cQp3ztM/openart-image-Fd-Jr-Sk-Po-1715448972349-raw.jpg", // Cambiado a una URL de imagen válida
    },
    {
      id: 6,
      title: "Legolas",
      profession: "Ingeniero",
      description: "Ingeniero",
      price: "24.500",
      rating: 3.5,
      background_image:
        "https://i.ibb.co/M7qWb7Q/Imagen-de-Whats-App-2024-05-11-a-las-12-15-14-1006b5ec.jpg", // Cambiado a una URL de imagen válida
    },
  ];

  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="contenedor">
      <div className="slider-introduction">
        <h2 className="slider-introduction-title title-server">
          Servicios de guerra!
        </h2>
        <p className="slider-introduction-description text-lg md:text-xl lg:text-1xl xl:text-2xl">
          ¿Buscas mejorar tu equipo, conseguir los mejores objetos o potenciar
          tus habilidades en World of Warcraft? ¡Estás en el lugar correcto!
          Nuestros jugadores profesionales están listos para ofrecerte sus
          servicios de profesiones.
        </p>
        <a
          className="slider-introduction-other text-lg md:text-xl lg:text-1xl xl:text-2xl"
          href="#"
        >
          Conoce otros guerreros!
        </a>
      </div>
      <Slider {...settings}>
        {partners.map((partner) => (
          <div key={partner.id} className="slider">
            <div className="cards-slider">
              <div className="slider-content">
                <p className="slider-title text-lg md:text-xl lg:text-2xl xl:text-3xl">
                  {partner.title}
                </p>
                <p className="slider-subtitle text-lg md:text-xl lg:text-1xl xl:text-2xl">
                  {partner.profession}
                </p>
              </div>
              <div className="slider-image">
                <img
                  src={partner.background_image}
                  className="bg-paper-image bg-no-repeat bg-cover bg-center h-64 rounded-lg overflow-hidden"
                />
              </div>
              <div className="slider-text">
                <p className="slider-description text-lg md:text-xl lg:text-2xl xl:text-2xl">
                  {partner.description.length > 30
                    ? `${partner.description.substring(0, 30)}...`
                    : partner.description}
                </p>
                <div className="slider-rating">
                  {Array.from(
                    { length: Math.floor(partner.rating) },
                    (_, index) => (
                      <span key={index} className="star-icon">
                        &#9733;
                      </span>
                    )
                  )}
                  {Array.from(
                    { length: 5 - Math.floor(partner.rating) },
                    (_, index) => (
                      <span key={index} className="star-icon">
                        &#9734;
                      </span>
                    )
                  )}
                </div>
                <div className="slider-contract mb-4">
                  <button className="contract-button">Contratar</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderHome;
