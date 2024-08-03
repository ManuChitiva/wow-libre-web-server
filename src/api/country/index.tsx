import { BASE_URL_AUTH } from "@/configs/configs";
import { GenericResponseDto } from "@/dto/generic";
import { CountryModel } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

const defaultCountryOptions: CountryModel[] = [
  { value: "Otro", label: "Otro", language: "es" },
  { value: "Others", label: "Others", language: "en" },
];

export const getAvailableCountries = async (): Promise<CountryModel[]> => {
  try {
    const transactionId = uuidv4(); // Genera un transaction-id único

    const response = await fetch(`${BASE_URL_AUTH}/api/resources/country`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        transaction_id: transactionId,
      },
    });

    const responseData: GenericResponseDto<CountryModel[]> =
      await response.json();

    if (response.ok && response.status === 200) {
      return responseData.data;
    }
    return defaultCountryOptions;
  } catch (error: any) {
    return defaultCountryOptions;
  }
};
