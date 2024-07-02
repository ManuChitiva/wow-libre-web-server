"use client";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Image from "next/image";

const banners = [
  {
    image: "/img/homes/banner/banner_one.jpg",
    alt: "Advertising banner for the game, showing arthas",
  },
  {
    image: "/img/homes/banner/banner_two.jpg",
    alt: "World of warcraft game advertising banner",
  },
  {
    image: "/img/homes/banner/banner_three.jpg",
    alt: "World of warcraft game advertising banner",
  },
  {
    image: "/img/homes/banner/banner_four.jpg",
    alt: "World of warcraft game advertising banner",
  },
];

const Advertising = () => {
  return (
    <div className="mt-4">
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={9000}
        showThumbs={false}
        dynamicHeight={false}
        showIndicators={false}
        showStatus={false}
        width={"100%"}
      >
        {banners.map((banner, index) => (
          <div
            key={index}
            className="relative"
            style={{
              width: "100%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              src={banner.image}
              alt={banner.alt}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "50rem", // Limita la altura máxima de la imagen
              }}
              className="rounded-lg"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Advertising;
