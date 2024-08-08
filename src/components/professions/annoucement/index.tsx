import { getAnnoucementProfession } from "@/api/annoucement";
import React from "react";
import Swal from "sweetalert2";

interface ConfirmationDialogProps {
  cost: number;
  characterId: number;
  skillId: number;
  accountId: number;
  token: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Announcement: React.FC<ConfirmationDialogProps> = ({
  cost,
  characterId,
  skillId,
  accountId,
  token,
  onConfirm,
  onCancel,
}) => {
  const handleConfirm = async () => {
    const result = await Swal.fire({
      icon: "question",
      title: "Confirmar",
      color: "white",
      background: "#0B1218",
      text: `El costo es de ${cost} g. ¿Desea proceder?`,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await getAnnoucementProfession(characterId, skillId, accountId, token);
        onConfirm();
      } catch (error) {
        console.error("Error during announcement:", error);
        Swal.fire({
          icon: "error",
          color: "white",
          background: "#0B1218",
          title: "Error",
          text: "No se pudo enviar el mensaje. Inténtelo de nuevo más tarde.",
          confirmButtonText: "Aceptar",
        });
      }
    } else {
      onCancel();
    }
  };

  React.useEffect(() => {
    handleConfirm();
  }, []);

  return null;
};

export default Announcement;
