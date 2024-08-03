"use client";
import { getGuild } from "@/api/guilds";
import GuildCharacter from "@/components/guild_character";
import LoadingSpinner from "@/components/loading-spinner";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import { useUserContext } from "@/context/UserContext";
import { GuildData } from "@/model/model";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BenefitsModel } from "@/model/benefit-model";
import { benefitsActive } from "@/api/benefit";
import Swal from "sweetalert2";
import DisplayMoney from "@/components/money";

const GuildDetail = () => {
  const guildId = useParams<{ id: string }>();
  const [guild, setGuild] = useState<GuildData>();
  const token = Cookies.get("token");
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal
  const [isLoading, setIsLoading] = useState(true);
  const [loggin, setLoggin] = useState(false);
  const [benefits, setBenefits] = useState<BenefitsModel[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [guildsResponse, benefitsResponse] = await Promise.all([
          getGuild(guildId.id),
          benefitsActive(),
        ]);
        setGuild(guildsResponse);
        setBenefits(benefitsResponse);
        setIsLoading(false);
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message}`,
          color: "white",
          background: "#0B1218",
          willClose: () => {
            router.push("/guild");
          },
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/guild");
          }
        });
      }
    };
    fetchData();
    setLoggin(token != null);
  }, [token]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20 items-center">
        <LoadingSpinner />;
      </div>
    );
  }

  return (
    <div>
      <div className="contenedor">
        <NavbarAuthenticated />
      </div>
      <div
        className="text-white"
        style={{
          background: "linear-gradient(to right, #0B1218, #2B5876, #4E4376)",
        }}
      >
        <div className="contenedor mx-auto px-6 py-12 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col justify-between max-w-2xl w-full">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-10">
                  Hermandad: {guild?.name}
                </h2>
                <p className="text-lg lg:text-2xl mb-4 break-words">
                  {guild?.info}
                </p>
              </div>
              <div>
                {loggin ? (
                  <>
                    <button
                      onClick={openModal}
                      className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold mb-4"
                    >
                      Vincularme
                    </button>
                  </>
                ) : (
                  <Link
                    href="/register"
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold mb-4"
                  >
                    Registrarme
                  </Link>
                )}
                <p className="text-lg pt-4 break-words">{guild?.motd}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:gap-8">
              <div className="relative h-80 lg:h-auto">
                <img
                  src="https://pbs.twimg.com/media/F6U741xWgAAfvX2.jpg"
                  alt="Envíos"
                  className="object-cover rounded-xl w-full h-full transition duration-300 hover:opacity-75"
                />
              </div>
              <div className="relative h-80 lg:h-auto">
                <img
                  src="https://preview.redd.it/bi7i6h79gzz81.jpg?auto=webp&s=ea927f5299719218b6af8d3d4b1d446140d0571d"
                  alt="Disney"
                  className="object-cover rounded-xl w-full h-full transition duration-300 hover:opacity-75"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-lg leading-7 text-white">
                Miembros suscritos
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                {guild?.members}
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-lg leading-7 text-white">Beneficios</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                {guild?.benefits.length}
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-lg leading-7 text-white">
                Dinero de la guild
              </dt>
              <dd className="order-first text-4xl font-semibold tracking-tight text-white sm:text-4xl">
                <DisplayMoney money={guild?.bank_money || 0} />
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <section className="contenedor mb-20">
        <div className="container px-6 py-10 mx-auto">
          <div className="xl:flex xl:items-center xL:-mx-4">
            <div className="xl:w-1/2 xl:mx-4">
              <h1 className="text-2xl font-semibold  capitalize lg:text-3xl text-white">
                Beneficios de pertenecer a una hermandad
              </h1>

              <p className="max-w-2xl mt-4 text-gray-300">
                Unirse a una hermandad en World of Warcraft ofrece una
                experiencia única y enriquecedora. Te permite conectarte con
                otros jugadores apasionados, colaborar en misiones épicas y
                acceder a recursos exclusivos que mejorarán tu juego.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-0 xl:mx-4 xl:w-1/2 md:grid-cols-2">
              <div>
                <img
                  className="object-cover rounded-xl aspect-square "
                  src="https://wow.zamimg.com/uploads/blog/images/19963-blizzard-takes-action-against-gallywix-and-gold-selling-for-real-money.jpg"
                  alt=""
                />

                <h1 className="mt-4 text-2xl font-semibold  capitalize text-white">
                  Evento Global: Sobreviviendo al capitalismo
                </h1>

                <p className="mt-2   text-gray-300 text-lg">
                  Al pertenecer a una guild, el pago diario de oro es unico por
                  toda la guild.
                </p>
              </div>

              <div>
                <img
                  className="object-cover rounded-xl aspect-square "
                  src="https://i.blogs.es/b8677c/wow-monturas/500_333.webp"
                  alt=""
                />

                <h1 className="mt-4 text-2xl font-semibold  capitalize text-white">
                  Premios
                </h1>

                <p className="mt-2   text-gray-300 text-lg">
                  Cada premio obtenido por la guild también otorga el derecho a
                  sus miembros de recibirlo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dark">
        <div className="container px-6 py-10 mx-auto">
          <div className="lg:-mx-6 lg:flex lg:items-center ">
            <img
              className="object-cover object-center lg:w-1/2 lg:mx-6 w-full h-96  lg:h-[36rem] rounded-2xl hover:shadow hover:shadow-teal-800"
              src="https://bnetcmsus-a.akamaihd.net/cms/blog_header/hd/HD1RQDNY2B1E1565028457549.jpg"
              alt=""
            />

            <div className="mt-8 lg:w-1/2 lg:px-6 lg:mt-0">
              <p className="text-5xl font-semibold text-blue-500 ">“</p>

              <h1 className="text-2xl font-semibold text-gray-800 dark:text-white lg:text-3xl lg:w-96">
                Compite con otras guilds
              </h1>

              <p className="max-w-lg mt-6 text-gray-500 dark:text-gray-400 ">
                Participa en competencias para que tu hermandad obtenga
                beneficios exclusivos para sus miembros.
              </p>

              <h3 className="mt-6 text-lg font-medium text-blue-500">
                Wow Libre
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Actualizacion de retos, cada 6 meses
              </p>

              <div className="flex items-center justify-between mt-12 lg:justify-start">
                <button
                  title="left arrow"
                  className="p-2 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  title="right arrow"
                  className="p-2 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 lg:mx-6 hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="contenedor mt-10">
        <section className="dark">
          <div className="container px-6 py-10 mx-auto">
            <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
              Eventos de los <span className="text-blue-500">6 meses</span>
            </h1>
            <p className="text-xl text-center text-gray-800 dark:text-white mt-2 max-w-xl mx-auto">
              Los premios obtenidos serán entregados a todos los miembros de la
              hermandad durante el evento. Pasado ese tiempo, los retos se
              actualizarán y deberán cumplirse nuevamente para adquirir los
              beneficios.
            </p>

            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-16 md:grid-cols-2 xl:grid-cols-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit.id}
                  className="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl dark:bg-gray-800"
                >
                  <span className="inline-block p-3 text-blue-500  ">
                    <img
                      src={benefit.logo}
                      alt="Logo"
                      className="w-40 h-40 rounded-full "
                    />
                  </span>

                  <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
                    {benefit.title}
                  </h1>

                  <p className="text-gray-500 dark:text-gray-300 text-xl">
                    {benefit.description}
                  </p>
                  <br />

                  <a
                    href={`${benefit.link}`}
                    data-wh-icon-size="small"
                    className="flex items-center -mx-1 text-lg text-blue-500 capitalize transition-colors duration-300 transform dark:text-blue-400 hover:underline hover:text-blue-600 dark:hover:text-blue-500"
                  >
                    <span className="mx-1">Detalle del ítem</span>
                    <svg
                      className="w-4 h-4 mx-1 rtl:-scale-x-100"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="dark contenedor">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
            Beneficios <span className="text-blue-500">obtenidos</span>
          </h1>

          <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 dark:text-gray-300">
            Al unirte a esta hermandad podrás obtener los siguientes beneficios:
          </p>

          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-2">
            {guild?.benefits && guild?.benefits.length > 0 ? (
              guild.benefits.map((benefit) => (
                <div
                  key={benefit.id}
                  className="px-12 py-8 transition-colors duration-300 transform border cursor-pointer rounded-xl hover:border-transparent group hover:bg-gray-800 dark:border-gray-700 dark:hover:border-transparent"
                >
                  <div className="flex flex-col sm:-mx-4 sm:flex-row">
                    <img
                      className="flex-shrink-0 object-cover w-24 h-24 rounded-full sm:mx-4 ring-4 ring-gray-300"
                      src={benefit.logo}
                      alt=""
                    />

                    <div className="mt-4 sm:mx-4 sm:mt-0">
                      <h1 className="text-xl font-semibold text-gray-700 capitalize md:text-2xl dark:text-white group-hover:text-white">
                        {benefit.title}
                      </h1>

                      <p className="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300 text-lg">
                        {benefit.sub_title}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex justify-center items-center">
                <p className="text-center text-gray-500 dark:text-gray-300  ">
                  Esta hermandad no cuenta con beneficios aún
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      {token && (
        <GuildCharacter
          isOpen={isModalOpen}
          token={token}
          guild_id={guildId.id}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default GuildDetail;
