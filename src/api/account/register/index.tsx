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
  const transactionId = uuidv4();

  const response = await fetch(`${BASE_URL_AUTH}/api/account/games/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      transaction_id: transactionId,
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
    const errorGeneric: GenericResponseDto<void> = await response.json();
    throw new Error(
      `${errorGeneric.message} - TransactionId: ${transactionId}`
    );
  }
};

export const registerAccountWeb = async (
  userData: AccountWebRequestDto
): Promise<LoginData> => {
  const transactionId = uuidv4();

  const response = await fetch(`${BASE_URL_AUTH}/api/account/web/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      transaction_id: transactionId,
    },
    body: JSON.stringify(userData),
  });

  const responseData = await response.json();
  if (response.ok && response.status === 201) {
    return responseData.data;
  } else if (response.status == 400) {
    const badRequestError: GenericResponseDto<BadRequestDto> = responseData;
    throw new Error(
      `${badRequestError.message} - TransactionId: ${transactionId}`
    );
  } else {
    const errorGeneric: GenericResponseDto<void> = await response.json();
    throw new Error(
      `${errorGeneric.message} - TransactionId: ${transactionId}`
    );
  }
};
