import React, { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "../models/interfaces/Response/user";
import { decrypt, encrypt } from "../utility/crypto";

interface UserContextType {
  user: IUser | null;
  setUserState: (x: IUser) => void;
  clearUserState: () => void;
}
interface UserProviderProps {
  children: React.ReactNode;
}
// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider: React.FC<UserProviderProps> = ({
  children,
}: any) => {
  const [user, setUser] = useState<IUser|null>(null);
    useEffect(() => {
        let lsData = localStorage.getItem('common');
        if(lsData) setUser(decrypt<IUser>(lsData));
    },[])

  const setUserState = (user: IUser) => {
    localStorage.setItem('common', encrypt(user));
    setUser(user);
  };

  const clearUserState = () => {
    setUser(null);
  };



  return (
    <UserContext.Provider value={{ user, setUserState, clearUserState }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within an UserProvider");
  }
  return context;
};
