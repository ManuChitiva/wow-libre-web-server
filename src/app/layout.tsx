import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./normalize.css";
import ClientFooter from "@/components/client_navbar/footer";
import UserProvider from "@/context/UserContext";
import I18Next from "@/context/I8nProviders";
import WowheadTooltip from "@/utils/wowhead";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wow Libre",
  description: "Servidor de World Of Warcraft",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="bg-midnight">
      <UserProvider>
        <I18Next>
          <body className={inter.className}>
            <WowheadTooltip />
            {children}
            <ClientFooter />
          </body>
        </I18Next>
      </UserProvider>
    </html>
  );
}
