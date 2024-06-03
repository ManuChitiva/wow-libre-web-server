"use client";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import advertisingBannerOne from "../../../../public/img/homes/banner/banner_one.jpg";
import advertisingBannerTwo from "../../../../public/img/homes/banner/banner_two.jpg";
import advertisingBannerThree from "../../../../public/img/homes/banner/banner_three.jpg";
import advertisingBannerFour from "../../../../public/img/homes/banner/banner_four.jpg";

import Image from "next/image";

const banners = [
  {
    image: advertisingBannerOne,
    alt: "Advertising banner for the game, showing arthas",
  },
  {
    image: advertisingBannerTwo,
    alt: "World of warcraft game advertising banner",
  },
  {
    image: advertisingBannerThree,
    alt: "World of warcraft game advertising banner",
  },
  {
    image: advertisingBannerFour,
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
          <div key={index} className="relative">
            <Image
              src={banner.image}
              alt={banner.alt}
              className="rounded-lg"
              style={{
                maxWidth: "100%",
                maxHeight: "50rem", // Limita la altura máxima de la imagen
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Advertising;
