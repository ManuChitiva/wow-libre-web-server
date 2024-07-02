import { BASE_URL_AUTH } from "@/configs/configs";
import { LoginData } from "@/model/model";

export const renewToken = async (refreshToken: string): Promise<LoginData> => {
  const response = await fetch(`${BASE_URL_AUTH}/api/token/renew`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (response.ok && response.status === 200) {
    const responseData = await response.json();
    return responseData.data;
  } else {
    throw new Error("No se pudo renovar el token.");
  }
};
