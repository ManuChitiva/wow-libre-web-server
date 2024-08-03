"use client";
import "./style.css";

import React from "react";
import { useRouter } from "next/navigation";

const TermsAndConditions = () => {
  const router = useRouter();

  const handleAcceptClick = () => {
    router.back();
  };

  const handleBackClick = () => {
    router.push("/");
  };

  return (
    <div className="bg-papyrus">
      <div className="contenedor flex flex-col min-h-screen text-gray-300">
        <main className="flex flex-col items-center justify-center flex-1 p-6 md:p-12">
          <div className="max-w-4xl w-full bg-papyrus-content rounded-lg shadow-lg p-8 md:p-12 border border-gray-400">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Términos y Condiciones
            </h1>
            <p className="text-lg md:text-xl mb-6">
              <strong>1. Aceptación de los Términos</strong>
              <br />
              Al acceder y utilizar nuestro sitio web, usted acepta cumplir y
              estar sujeto a los siguientes términos y condiciones. Si no está
              de acuerdo con estos términos, no utilice nuestro sitio web.
            </p>
            <p className="text-lg md:text-xl mb-6">
              <strong>2. Uso del Sitio Web</strong>
              <br />
              Nuestro sitio web está destinado únicamente para su uso personal y
              no comercial. No debe utilizar el sitio para ningún propósito
              ilegal o no autorizado. Usted es responsable de cumplir con todas
              las leyes locales, estatales y nacionales mientras utiliza nuestro
              sitio.
            </p>
            <p className="text-lg md:text-xl mb-6">
              <strong>3. Propiedad Intelectual</strong>
              <br />
              Todo el contenido y materiales en nuestro sitio web, incluidos
              pero no limitados a texto, gráficos, logotipos, imágenes, y
              software, son propiedad de nuestra empresa o de nuestros
              licenciantes y están protegidos por las leyes de propiedad
              intelectual.
            </p>
            <p className="text-lg md:text-xl mb-6">
              <strong>4. Modificaciones del Servicio</strong>
              <br />
              Nos reservamos el derecho de modificar o discontinuar el servicio
              en cualquier momento sin previo aviso. No seremos responsables
              ante usted ni ante ningún tercero por cualquier modificación,
              suspensión o interrupción del servicio.
            </p>
            <p className="text-lg md:text-xl mb-6">
              <strong>5. Enlaces a Sitios de Terceros</strong>
              <br />
              Nuestro sitio web puede contener enlaces a sitios web de terceros.
              No tenemos control sobre el contenido de esos sitios y no asumimos
              ninguna responsabilidad por ellos. Su uso de los sitios web de
              terceros está sujeto a los términos y condiciones de esos sitios.
            </p>
            <p className="text-lg md:text-xl mb-6">
              <strong>6. Limitación de Responsabilidad</strong>
              <br />
              En la medida máxima permitida por la ley aplicable, no seremos
              responsables por daños indirectos, incidentales, especiales,
              consecuentes o punitivos, o por la pérdida de beneficios, datos o
              uso, que resulten del uso o la incapacidad de usar nuestro sitio
              web.
            </p>
            <p className="text-lg md:text-xl mb-6">
              <strong>7. Indemnización</strong>
              <br />
              Usted acepta indemnizar y mantener a nuestra empresa y a nuestros
              afiliados, directores, empleados y agentes, indemnes de cualquier
              reclamo, demanda, responsabilidad, pérdida, daño o gasto
              (incluidos los honorarios legales razonables) que surjan de su uso
              del sitio web o de su incumplimiento de estos términos.
            </p>
            <p className="text-lg md:text-xl mb-6">
              <strong>8. Ley Aplicable</strong>
              <br />
              Estos términos se regirán e interpretarán de acuerdo con las leyes
              del país donde se encuentra nuestra empresa, sin tener en cuenta
              los principios de conflicto de leyes. Cualquier disputa
              relacionada con estos términos estará sujeta a la jurisdicción
              exclusiva de los tribunales ubicados en nuestra sede.
            </p>
            <p className="text-lg md:text-xl mb-6">
              <strong>9. Aviso Legal</strong>
              <br />
              Este sitio web no está afiliado, asociado, autorizado, respaldado
              por, o de cualquier forma conectado oficialmente con Blizzard
              Entertainment, Inc., o cualquiera de sus subsidiarias o sus
              afiliados. Los nombres de World of Warcraft, Warcraft, y Blizzard
              Entertainment, así como sus respectivos logotipos, son marcas
              comerciales o marcas registradas de Blizzard Entertainment, Inc.
            </p>

            <div className="flex flex-col md:flex-row md:justify-between md:gap-4">
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out mb-4 md:mb-0"
                type="button"
                onClick={handleAcceptClick}
              >
                Aceptar
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
                type="button"
                onClick={handleBackClick}
              >
                Volver
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TermsAndConditions;
