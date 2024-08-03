import { BASE_URL_CHARACTER } from "@/configs/configs";
import { GenericResponseDto } from "@/dto/generic";
import { GuildData, GuildsDto } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

export const getGuilds = async (
  page: number = 0,
  size: number = 10
): Promise<GuildsDto> => {
  try {
    const transactionId = uuidv4();

    const response = await fetch(
      `${BASE_URL_CHARACTER}/api/guilds?size=${size}&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          transaction_id: transactionId,
        },
      }
    );

    const responseData: GenericResponseDto<GuildsDto> = await response.json();

    if (response.ok && response.status === 200) {
      return responseData.data;
    } else {
      const errorMessage = await response.text();
      throw new Error(`Error [${response.status}]: ${errorMessage}`);
    }
  } catch (error: any) {
    console.error(`Error: ${error.message}`, error);
    throw new Error(
      `It was not possible to obtain the guilds: ${error.message}`
    );
  }
};

export const getGuild = async (guildId: string): Promise<GuildData> => {
  try {
    const transactionId = uuidv4();

    const response = await fetch(
      `${BASE_URL_CHARACTER}/api/guilds/${guildId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          transaction_id: transactionId,
        },
      }
    );

    if (response.ok && response.status === 200) {
      const responseData: GenericResponseDto<GuildData> = await response.json();

      return responseData.data;
    } else {
      const errorGeneric: GenericResponseDto<void> = await response.json();

      throw new Error(
        `${errorGeneric.message} - Transaction Id: ${transactionId}`
      );
    }
  } catch (error: any) {
    throw new Error(
      `It was not possible to obtain the guilds: ${error.message}`
    );
  }
};

export const attach = async (
  guildId: string,
  accountId: string,
  characterId: string,
  token: string
): Promise<void> => {
  try {
    const transactionId = uuidv4();

    const response = await fetch(
      `${BASE_URL_CHARACTER}/api/guilds/${guildId}/attach?account_id=${accountId}&character_id=${characterId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          transaction_id: transactionId,
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.ok && response.status === 204) {
      return;
    } else {
      const responseData: GenericResponseDto<void> = await response.json();
      throw new Error(`${responseData.message}`);
    }
  } catch (error: any) {
    console.error(`Error: ${error.message}`, error);
    throw new Error(` ${error.message}`);
  }
};
