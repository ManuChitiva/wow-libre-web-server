import React from "react";

const Footer = () => {
  return (
    <footer className="contenedor pt-10 sm:pt-16">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-8 xl:space-y-0">
          {/* Sección de términos y condiciones */}
          <div className="sm:order-2 mt-8 grid grid-cols-1 gap-8 xl:gap-12 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h4 className="text-sm leading-5 font-semibold tracking-wider text-gray-400 uppercase">
                  Términos y condiciones
                </h4>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-base leading-6 text-gray-300 hover:text-gray-100 transition duration-150 ease-in-out"
                    >
                      Términos de uso
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base leading-6 text-gray-300 hover:text-gray-100 transition duration-150 ease-in-out"
                    >
                      Política de privacidad
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sección de redes sociales */}
          <div className="sm:order-1 space-y-8 xl:space-y-0">
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex justify-center sm:justify-start space-x-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-300 transition duration-150 ease-in-out"
                >
                  <span className="sr-only">Facebook</span>
                  <img
                    className="h-8 w-8"
                    src="../img/footer/facebook.png"
                    alt="Facebook Icon"
                  />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-300 transition duration-150 ease-in-out"
                >
                  <span className="sr-only">Instagram</span>
                  <img
                    className="h-8 w-8"
                    src="../img/footer/instagram.png"
                    alt="Instagram Icon"
                  />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-300 transition duration-150 ease-in-out"
                >
                  <span className="sr-only">WhatsApp</span>
                  <img
                    className="h-8 w-8"
                    src="../img/footer/whatsapp.png"
                    alt="WhatsApp Icon"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
        <div className="text-center md:text-left text-base leading-6 text-gray-400">
          <p className="text-2xl mb-10 ">
            World of Warcraft® and Blizzard Entertainment® are all trademarks or
            registered trademarks of Blizzard Entertainment in the United States
            and/or other countries. These terms and all related materials,
            logos, and images are copyright © Blizzard Entertainment. This site
            is in no way associated with or endorsed by Blizzard Entertainment®.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
