import { BASE_URL_CHARACTER } from "@/configs/configs";
import { GenericResponseDto } from "@/dto/generic";
import { BenefitsModel } from "@/model/benefit-model";
import { v4 as uuidv4 } from "uuid";

export const benefitsActive = async (): Promise<BenefitsModel[]> => {
  try {
    const transactionId = uuidv4();

    const response = await fetch(`${BASE_URL_CHARACTER}/api/benefits`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        transaction_id: transactionId,
      },
    });
    const responseData: GenericResponseDto<BenefitsModel[]> =
      await response.json();

    if (response.ok && response.status === 200) {
      return responseData.data;
    } else {
      const responseData: GenericResponseDto<void> = await response.json();
      throw new Error(`${responseData.message}`);
    }
  } catch (error: any) {
    console.error(`Error: ${error.message}`, error);
    throw new Error(` ${error.message}`);
  }
};
