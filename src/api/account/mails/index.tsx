import { BASE_URL_CHARACTER } from "@/configs/configs";
import { MailsDto } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

export const getMails = async (
  jwt: string,
  character_id: number
): Promise<MailsDto> => {
  const response = await fetch(
    `${BASE_URL_CHARACTER}/api/mails/${character_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        transaction_id: uuidv4(),
        Authorization: "Bearer " + jwt,
      },
    }
  );

  const responseData = await response.json();
  if (response.ok && response.status === 200) {
    return responseData.data;
  } else {
    const errorMessage = await response.text();
    throw new Error(
      `An error occurred while trying to register data: ${errorMessage}`
    );
  }
};
