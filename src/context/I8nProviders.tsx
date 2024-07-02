"use client";

import { I18nextProvider } from "react-i18next";
import i18n from "../i18n"; // Importa la configuración de i18next
interface UserProviderProps {
  children: React.ReactNode;
}
const I18Next = ({ children }: UserProviderProps) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
export default I18Next;
