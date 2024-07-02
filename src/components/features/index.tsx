import React from "react";

const Features = () => {
  return (
    <section
      id="features"
      className="container mx-auto px-4 space-y-6   py-8 md:py-12 lg:py-20"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl text-white">
          Servicio de Soporte
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 text-gray-300">
          Explora nuestra dedicación a ofrecer un soporte de calidad
          excepcional.
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        <div className="relative overflow-hidden rounded-lg border bg-white dark:bg-gray-800 select-none hover:shadow hover:shadow-teal-200 p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="h-12 w-12 fill-current"
            >
              <path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 2.313c7.57 0 13.688 6.118 13.688 13.688 0 2.233-.54 4.346-1.5 6.219l-5.626-6.656h.626c.521 0 .95-.428.95-.95v-5.75c0-.521-.428-.95-.95-.95h-4.75v-1.25c0-.522-.428-.95-.95-.95h-5.75c-.521 0-.95.428-.95.95v1.25h-4.75c-.522 0-.95.428-.95.95v5.75c0 .522.428.95.95.95h.625l-5.625 6.656a13.657 13.657 0 0 1-1.5-6.219C2.313 8.43 8.43 2.313 16 2.313zm-.625 3.406h1.25v1.25h-1.25v-1.25zm-7.75 2.5h1.25v1.25h-1.25v-1.25zm15.5 0h1.25v1.25h-1.25v-1.25zm-4.563 2.312h1.25v1.25h-1.25v-1.25zm-2.187 0h1.25v1.25h-1.25v-1.25zm-2.188 0h1.25v1.25h-1.25v-1.25zm-4.562 2.313h1.25v1.25h-1.25v-1.25zm17.062 0h1.25v1.25h-1.25v-1.25zm-7.75 2.5h1.25v1.25h-1.25v-1.25zm-2.188 0h1.25v1.25h-1.25v-1.25zm-2.187 0h1.25v1.25h-1.25v-1.25zm-7.75 2.5h1.25v1.25h-1.25v-1.25zm20.938 0h1.25v1.25h-1.25v-1.25zm-11.75 2.5h1.25v1.25h-1.25v-1.25zm-2.187 0h1.25v1.25h-1.25v-1.25zm-4.563 0h1.25v1.25h-1.25v-1.25zm4.563 2.312h1.25v1.25h-1.25v-1.25zm7.75 0h1.25v1.25h-1.25v-1.25zm-2.188 0h1.25v1.25h-1.25v-1.25zm2.188 2.313h1.25v1.25h-1.25v-1.25zm-2.188 0h1.25v1.25h-1.25v-1.25zm-2.187 0h1.25v1.25h-1.25v-1.25zm-2.188 0h1.25v1.25h-1.25v-1.25zm-4.562-2.313h1.25v1.25h-1.25v-1.25zm17.062 0h1.25v1.25h-1.25v-1.25zm-7.75 2.5h1.25v1.25h-1.25v-1.25zm-2.188 0h1.25v1.25h-1.25v-1.25zm-4.562-2.312h1.25v1.25h-1.25v-1.25zm17.062 0h1.25v1.25h-1.25v-1.25z" />
            </svg>

            <div className="space-y-2">
              <h3 className="font-bold text-black ">Servidores Dedicados</h3>
              <p className="text-sm text-muted-foreground text-gray-600 dark:text-gray-400">
                Descubre servidores dedicados operativos 24/7, garantizando
                disponibilidad y rendimiento excepcionales todos los días del
                año.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-white dark:bg-gray-800 select-none hover:shadow hover:shadow-teal-200 p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
              <path d="M0 12C0 5.373 5.373 0 12 0c4.873 0 9.067 2.904 10.947 7.077l-15.87 15.87a11.981 11.981 0 0 1-1.935-1.099L14.99 12H12l-8.485 8.485A11.962 11.962 0 0 1 0 12Zm12.004 12L24 12.004C23.998 18.628 18.628 23.998 12.004 24Z"></path>
            </svg>
            <div className="space-y-2">
              <h3 className="font-bold text-black dark:text-white">
                Maestros del Juego Expertos
              </h3>
              <p className="text-sm text-muted-foreground text-gray-600 dark:text-gray-400">
                Descubre a los mejores Maestros del Juego disponibles para
                satisfacer todas tus necesidades durante tus sesiones de juego.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-white dark:bg-gray-800 select-none hover:shadow hover:shadow-teal-400 p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
              <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"></path>
            </svg>
            <div className="space-y-2">
              <h3 className="font-bold text-black dark:text-white">
                Integración Web Exclusiva
              </h3>
              <p className="text-sm text-muted-foreground text-gray-600 dark:text-gray-400">
                Descubre las funcionalidades integradas exclusivas de World of
                Warcraft directamente en nuestro sitio web.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
