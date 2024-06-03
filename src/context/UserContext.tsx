"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export interface UserModel {
  id: number | null;
  username: string;
  country: string;
  language: string;
  date_of_birth: Date | null;
  first_name: string;
  last_name: string;
  cell_phone: string;
  email: string;
  logged_in: boolean;
}

const initialUserData: UserModel = {
  id: null,
  username: "",
  country: "",
  language: "es",
  date_of_birth: null,
  first_name: "",
  last_name: "",
  cell_phone: "",
  email: "",
  logged_in: false,
};

// Definición del contexto y sus tipos
interface UserContextProps {
  user: UserModel;
  setUser: React.Dispatch<React.SetStateAction<UserModel>>;
  clearUserData: () => void;
}

export const UserContext = createContext<UserContextProps>({
  user: initialUserData,
  setUser: () => {},
  clearUserData: () => {},
});

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  let initialUser = initialUserData;

  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    initialUser = storedUser ? JSON.parse(storedUser) : initialUserData;
  }

  const [user, setUser] = useState<UserModel>(initialUser);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const clearUserData = () => {
    localStorage.removeItem("user");
    setUser(initialUserData);
    Cookies.remove("jwt");
  };

  return (
    <UserContext.Provider value={{ user, setUser, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUserContext = (): UserContextProps => {
  return useContext(UserContext);
};
