import { BASE_URL_AUTH } from "@/configs/configs";
import { GenericResponseDto } from "@/dto/generic";
import { FaqsModel } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

export const getFaqs = async (): Promise<FaqsModel[]> => {
  try {
    const transactionId = uuidv4(); // Genera un transaction-id único

    const response = await fetch(`${BASE_URL_AUTH}/api/resources/faqs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        transaction_id: transactionId,
      },
    });

    const responseData: GenericResponseDto<FaqsModel[]> = await response.json();

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
