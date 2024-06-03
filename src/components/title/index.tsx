import React from "react";
import "./style.css";

interface TitleWowProps {
  title: string;
  description: string;
}

const TitleWow = ({ title, description }: TitleWowProps) => {
  return (
    <div className="title-wow-container">
      <h2 className="title-text text-center mb-4 text-6xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl title-server">
        {title}
        <br />
        WOW <span className="highlight-text">LIBRE</span>
      </h2>
      <div className="description-container">
        <p className="description-text text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl">
          {description}
        </p>
      </div>
    </div>
  );
};

export default TitleWow;
