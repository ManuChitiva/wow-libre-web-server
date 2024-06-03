import { BASE_URL_AUTH } from "@/configs/configs";
import { BadRequestDto, GenericResponseDto } from "@/dto/generic";
import {
  AccountGameRequestDto,
  AccountWebRequestDto,
  LoginData,
} from "@/model/model";
import { v4 as uuidv4 } from "uuid";

export const registerAccountGame = async (
  userData: AccountGameRequestDto,
  jwt: string
): Promise<void> => {
  const response = await fetch(`${BASE_URL_AUTH}/api/account/games/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      transaction_id: uuidv4(),
      Authorization: "Bearer " + jwt,
    },
    body: JSON.stringify(userData),
  });

  const responseData = await response.json();
  if (response.ok && response.status === 201) {
    return responseData;
  } else if (response.status == 409) {
    const badRequestError: GenericResponseDto<void> = responseData;
    throw new Error(`Error: ${badRequestError.message}`);
  } else {
    const errorMessage = await response.text();
    throw new Error(
      `An error occurred while trying to register data: ${errorMessage}`
    );
  }
};

export const registerAccountWeb = async (
  userData: AccountWebRequestDto
): Promise<LoginData> => {
  const response = await fetch(`${BASE_URL_AUTH}/api/account/web/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      transaction_id: uuidv4(),
    },
    body: JSON.stringify(userData),
  });

  const responseData = await response.json();
  if (response.ok && response.status === 201) {
    return responseData.data;
  } else if (response.status == 400) {
    const badRequestError: GenericResponseDto<BadRequestDto> = responseData;
    throw new Error(
      `An error occurred while trying to register data ${badRequestError.message}`
    );
  } else {
    const errorMessage = await response.text();
    throw new Error(
      `An error occurred while trying to register data ${errorMessage}`
    );
  }
};
