import { BASE_URL_AUTH } from "@/configs/configs";
import { GenericResponseDto } from "@/dto/generic";
import { ExistEmailModel } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

export const existEmail = async (email: string): Promise<ExistEmailModel> => {
  const transactionId = uuidv4();

  try {
    const response = await fetch(
      `${BASE_URL_AUTH}/api/account/web/search?email=${encodeURIComponent(
        email
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          transaction_id: transactionId,
        },
      }
    );

    const responseData: GenericResponseDto<ExistEmailModel> =
      await response.json();

    if (response.ok && response.status === 200) {
      return responseData.data;
    } else {
      const errorGeneric: GenericResponseDto<void> = await response.json();
      throw new Error(
        `${errorGeneric.message} - TransactionId: ${transactionId}`
      );
    }
  } catch (error: any) {
    console.error(`Error: ${error.message}`, error);
    throw new Error(
      `It was not possible to validate the client's email: ${error.message}`
    );
  }
};
