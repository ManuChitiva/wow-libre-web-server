import { BASE_URL_AUTH } from "@/configs/configs";
import { BadRequestDto, GenericResponseDto } from "@/dto/generic";
import { AccountChangePasswordGameDto } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

export const changePasswordGame = async (
  userData: AccountChangePasswordGameDto,
  jwt: string
): Promise<void> => {
  const response = await fetch(
    `${BASE_URL_AUTH}/api/account/games/change-password`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        transaction_id: uuidv4(),
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(userData),
    }
  );

  const responseData = await response.json();
  if (response.ok && response.status === 201) {
    return responseData;
  } else if (response.status == 409) {
    const badRequestError: GenericResponseDto<void> = responseData;
    throw new Error(`Error: ${badRequestError.message}`);
  } else {
    const errorMessage = await response.text();
    throw new Error(`Error: ${errorMessage}`);
  }
};
