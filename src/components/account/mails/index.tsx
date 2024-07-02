import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import DisplayMoney from "@/components/money";
import { getMails } from "@/api/account/mails";
import { MailsDto } from "@/model/model";
import Swal from "sweetalert2";

interface MailsProps {
  token: string;
  character_id: number;
}

const Mails: React.FC<MailsProps> = ({ token, character_id }) => {
  const [mails, setMails] = useState<MailsDto>();
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const mailsPerPage = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedMails: MailsDto = await getMails(token, character_id);
        setMails(fetchedMails);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No fue posible obtener los mensajes asociados al personaje.",
          color: "white",
          background: "#0B1218",
          timer: 4500,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, character_id]);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-white text-center">Cargando...</div>
      </div>
    );
  }

  const indexOfLastMail = currentPage * mailsPerPage;
  const indexOfFirstMail = indexOfLastMail - mailsPerPage;
  const currentMails = mails?.mails.slice(indexOfFirstMail, indexOfLastMail);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const deleteMail = (mailId: number) => {
    console.log(`Eliminando correo con ID: ${mailId}`);
  };

  const markAsReceived = (mailId: number) => {
    console.log(`Marcando como recibido correo con ID: ${mailId}`);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="my-4 mx-8">
        <h2 className=" text-3xl font-semibold text-white mb-6">Mensajes</h2>
        <hr className="border-t-1 border-gray-300 " />
      </div>

      <div className="mx-2">
        {mails?.mails.length ? (
          currentMails?.map((mail) => (
            <div key={mail.id} className="p-6 rounded-lg shadow-md mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl text-yellow-300 font-semibold">
                  Asunto: {mail.subject}
                </h3>
                <span className="text-sm text-gray-400">
                  {new Date(mail.deliver_time).toLocaleDateString()}
                </span>
              </div>
              {mail.body && (
                <p className="text-white mb-4 text-md">{mail.body}</p>
              )}
              <div className="flex items-center space-x-2">
                {mail.has_items && (
                  <div className="text-white flex flex-col ">
                    <FontAwesomeIcon
                      icon={faGift}
                      className="text-green-400 pt-5 pr-5"
                      title="Tiene items"
                    />
                    <button className="mt-4 px-3 py-1 rounded-md bg-gray-600 text-white hover:bg-blue-600">
                      Detalle de items
                    </button>
                  </div>
                )}
                {mail.money > 0 && (
                  <div className="flex items-center space-x-1 pt-9">
                    <span>
                      <DisplayMoney money={mail.money} />
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <span className="text-gray-400">
                  Enviado por: {mail.sender_name}
                </span>
              </div>
              <div className="mt-2">
                <span className="text-gray-400">
                  Expira: {new Date(mail.expire_time).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-end mt-4 space-x-4">
                <button
                  className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600"
                  onClick={() => deleteMail(mail.id)}
                >
                  Eliminar
                </button>
                <button
                  className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                  onClick={() => markAsReceived(mail.id)}
                >
                  Recibir
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-white text-center mt-8">
            No cuentas con correspondencia.
          </div>
        )}

        {/* Paginación */}
        {mails?.mails.length > mailsPerPage && (
          <div className="flex justify-between mt-4">
            <button
              className={`mx-1 px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                  : "bg-gray-900 hover:bg-gray-700 text-white"
              }`}
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <button
              className={`mx-1 px-3 py-1 rounded-md ${
                indexOfLastMail >= (mails?.mails.length || 0)
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                  : "bg-gray-900 hover:bg-gray-700 text-white"
              }`}
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastMail >= (mails?.mails.length || 0)}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mails;
