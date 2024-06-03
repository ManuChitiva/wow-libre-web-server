"use client";
import React from "react";

const Subscription = () => {
  return (
    <div className="contenedor rounded-lg overflow-hidden mt-10 mb-20">
      <div className="max-w-52xl mx-auto">
        <div className="relative">
          <div className="bg-gradient-to-br from-pink-600 to-indigo-900 rounded-t-lg">
            <h2 className="text-3xl font-bold  p-6 text-white">
              Suscríbete al pase azeroth
            </h2>
          </div>
        </div>

        <div className=" bg-white rounded-b-md">
          <p className=" font-bold text-gray-700 p-4">
            Consigue los mejores beneficios
          </p>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="rounded-full h-32 w-32 overflow-hidden mx-auto mb-2">
                {" "}
                {/* Aumentamos el tamaño de los contenedores */}
                <img
                  className="rounded-full h-full w-full object-cover"
                  src="https://i.ibb.co/txq9mB8/migraciones.jpg"
                  alt="Avatar"
                />
              </div>
              <p className=" font-bold text-gray-600">
                Migracion de tus personajes a otros servidores
              </p>
            </div>
            <div className="text-center">
              <div className="rounded-full  h-32 w-32 overflow-hidden mx-auto mb-2">
                {" "}
                {/* Aumentamos el tamaño de los contenedores */}
                <img
                  className="rounded-full h-full w-full object-cover"
                  src="https://i.ibb.co/RY9s1k6/281-mobile-background.jpg"
                  alt="Avatar"
                />
              </div>
              <p className="font-bold text-gray-600">
                Servicios de juego - Ilimitados
              </p>
            </div>
            <div className="text-center">
              <div className="rounded-full h-32 w-32 overflow-hidden mx-auto mb-2">
                {" "}
                {/* Aumentamos el tamaño de los contenedores */}
                <img
                  className="rounded-full h-full w-full object-cover"
                  src="https://i.ibb.co/Bc0z2Bw/regalos-navidad.png"
                  alt="Avatar"
                />
              </div>
              <p className="font-bold text-gray-600">Regalos y beneficios</p>
            </div>
          </div>
          <div className="flex justify-end pr-4 pb-4">
            {" "}
            {/* Se agregó pr-4 para dar margen derecho al botón */}
            <button className="bg-pink-600 text-white py-3 px-7 rounded-lg hover:bg-pink-700">
              Suscribirse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
