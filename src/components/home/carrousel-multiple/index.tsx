"use client";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./style.css";

const MultiCarousel = () => {
  const items = [
    {
      id: 1,
      image: "https://i.ibb.co/QnVTf01/1082103-raptor-fosilizado.jpg",
      title: "Dinosaurio Durotar",
      description: "Montura",
      price: "200g",
      disclaimer: "Oferta esclusiva",
    },
    {
      id: 2,
      image: "https://i.ibb.co/HrdwNS5/Okan01.jpg",
      title: "Komodo",
      description: "Montura",
      price: "200g",
      disclaimer: "Oferta esclusiva",
    },
    {
      id: 3,
      image: "https://i.ibb.co/GkZyPNH/1125458-montura-espectral-de-eve.jpg",
      title: "Escoba",
      description: "Montura",
      price: "200g",
      disclaimer: "Oferta esclusiva",
    },
    {
      id: 4,
      image: "https://i.ibb.co/sVNbt0v/images.jpg",
      title: "Perro Inframundo",
      description: "Montura",
      price: "200g",
      disclaimer: "Oferta esclusiva",
    },
    {
      id: 5,
      image: "https://i.ibb.co/MSH1gsz/7-UDK5-QF3-RP1-O1690524396550.jpg",
      title: "Ropa Gm",
      description: "Item",
      price: "200g",
      disclaimer: "Oferta esclusiva",
    },
  ];

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="carrousel-offert">
      <div>
        <h3 className="carrousel-offert-title text-lg md:text-x2 lg:text-3xl xl:text-3xl mt-3 ml-7">
          Inspirado en lo último que viste
        </h3>
      </div>
      <Carousel className="carrousel-offert-content" responsive={responsive}>
        {items.map((item) => (
          <div className="carrousel-offert-content-product" key={item.id}>
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full transition duration-300 hover:opacity-75"
              />
            </div>
            <div className="carrousel-offert-content-product-detail">
              <p className="carrousel-offert-content-product-detail-title text-lg md:text-x4 lg:text-4xl xl:text-4xl mb-4 pt-4">
                {item.title}
              </p>
              <p className="carrousel-offert-content-product-detail-description text-lg md:text-x2 lg:text-2xl xl:text-2xl">
                {item.description}
              </p>
              <p className="carrousel-offert-content-product-detail-price text-lg md:text-xl lg:text-3xl xl:text-3xl pt-9">
                {item.price}
              </p>
              <p className="carrousel-offert-content-product-detail-disclaimer text-lg md:text-xl lg:text-3xl xl:text-2xl pt-2">
                {item.disclaimer}
              </p>
              <button className="carrousel-offert-content-product-detail-button text-lg md:text-xl lg:text-1xl xl:text-2xl ">
                Comprar
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default MultiCarousel;
