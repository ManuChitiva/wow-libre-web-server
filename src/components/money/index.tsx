import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

library.add(faCircle);
const MoneyIcons: React.FC<{ color: string }> = ({ color }) => (
  <div className={`text-${color} inline-block mr-1 mt-1`}>
    <FontAwesomeIcon icon={faCircle} />
  </div>
);

const DisplayMoney = (money: number) => {
  const goldValue = 10000;
  const silverValue = 100;

  const gold = Math.floor(money / goldValue);
  const remainingSilver = money % goldValue;
  const silver = Math.floor(remainingSilver / silverValue);
  const copper = remainingSilver % silverValue;

  return (
    <div className="text-white mt-5 text-center">
      <span className="mr-2">Dinero disponible:</span>
      <div className="flex justify-center items-center">
        <div className="mr-1">
          <MoneyIcons color="yellow-500" />
          <span className="ml-1">{gold}</span>
        </div>
        <div className="mr-1">
          <MoneyIcons color="gray-500" />
          <span className="ml-1">{silver}</span>
        </div>
        <div>
          <MoneyIcons color="orange-500" />
          <span className="ml-1">{copper}</span>
        </div>
      </div>
    </div>
  );
};

export default DisplayMoney;
