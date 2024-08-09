import { BASE_URL_CHARACTER } from "@/configs/configs";
import { GenericResponseDto } from "@/dto/generic";
import { Profession } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

export const getProfessions = async (
  character_id: number,
  token: string
): Promise<Profession[]> => {
  try {
    const transactionId = uuidv4();

    const response = await fetch(
      `${BASE_URL_CHARACTER}/api/professions?character_id=${character_id}`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          transaction_id: transactionId,
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<Profession[]> =
        await response.json();

      return responseData.data;
    } else {
      const errorGeneric: GenericResponseDto<void> = await response.json();

      throw new Error(
        `${errorGeneric.message} - Transaction Id: ${transactionId}`
      );
    }
  } catch (error: any) {
    throw new Error(
      `It was not possible to obtain the professions: ${error.message}`
    );
  }
};

export const professionsServices = async (
  characterId: number,
  skillId: number,
  accountId: number,
  is_public: boolean,
  description: string,
  token: string
): Promise<GenericResponseDto<void>> => {
  try {
    const transactionId = uuidv4();

    const response = await fetch(
      `${BASE_URL_CHARACTER}/api/professions/services`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          transaction_id: transactionId,
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          character_id: characterId,
          skill_id: skillId,
          account_id: accountId,
          description: description,
          public: is_public,
        }),
      }
    );

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<void> = await response.json();

      return responseData;
    } else {
      const errorGeneric: GenericResponseDto<void> = await response.json();

      throw new Error(
        `${errorGeneric.message} - Transaction Id: ${transactionId}`
      );
    }
  } catch (error: any) {
    throw new Error(
      `It was not possible to obtain the professions: ${error.message}`
    );
  }
};
