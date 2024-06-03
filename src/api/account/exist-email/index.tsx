import { BASE_URL_AUTH } from "@/configs/configs";
import { GenericResponseDto } from "@/dto/generic";
import { CountryModel, ExistEmailModel } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

export const existEmail = async (email: string): Promise<ExistEmailModel> => {
  try {
    const response = await fetch(
      `${BASE_URL_AUTH}/api/account/search?email=${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          transaction_id: uuidv4(),
        },
      }
    );

    const responseData: GenericResponseDto<ExistEmailModel> =
      await response.json();

    if (response.ok && response.status === 200) {
      return responseData.data;
    } else {
      const errorMessage = await response.text();
      throw new Error(`Error [${response.status}]: ${errorMessage}`);
    }
  } catch (error: any) {
    console.error(`Error: ${error.message}`, error);
    throw new Error(
      `It was not possible to obtain the available countries: ${error.message}`
    );
  }
};
