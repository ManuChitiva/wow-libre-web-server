import { BASE_URL_AUTH } from "@/configs/configs";
import { GenericResponseDto } from "@/dto/generic";
import { LoginData } from "@/model/model";
import { v4 as uuidv4 } from "uuid";

export const login = async (
  userName: string,
  password: string
): Promise<LoginData> => {
  try {
    const requestBody: {
      username: string;
      password: string;
    } = {
      username: userName,
      password: password,
    };

    const response = await fetch(`${BASE_URL_AUTH}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        transaction_id: uuidv4(),
      },
      body: JSON.stringify(requestBody),
    });
    const responseData: GenericResponseDto<LoginData> = await response.json();

    if (response.ok && response.status === 200) {
      return responseData.data;
    } else {
      const errorMessage = await response.text();
      throw new Error(`Error [${response.status}]: ${errorMessage}`);
    }
  } catch (error: any) {
    console.error(`Error: ${error.message}`, error);
    throw new Error(`Services are not available: ${error.message}`);
  }
};
