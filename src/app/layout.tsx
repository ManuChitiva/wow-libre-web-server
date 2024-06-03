import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./normalize.css";
import ClientNavbar from "@/components/client_navbar/navbar";
import ClientFooter from "@/components/client_navbar/footer";
import UserProvider from "@/context/UserContext";

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
        <body className={inter.className}>
          <ClientNavbar />
          {children}
          <ClientFooter />
        </body>
      </UserProvider>
    </html>
  );
}
