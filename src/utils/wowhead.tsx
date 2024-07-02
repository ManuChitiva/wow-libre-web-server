"use client";
import React, { useEffect } from "react";

const WowheadTooltip: React.FC = () => {
  useEffect(() => {
    const scriptElement = document.createElement("script");
    scriptElement.src = "https://wow.zamimg.com/js/tooltips.js";
    scriptElement.async = true;

    document.body.appendChild(scriptElement);

    return () => {
      document.body.removeChild(scriptElement);
    };
  }, []);

  return null;
};

export default WowheadTooltip;
