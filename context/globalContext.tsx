import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getCurrentUser } from "../lib/appwrite";

// Define the shape of the user data
interface User {
  $id: string;
  email: string;
  // Add other fields as necessary
}

// Define the shape of the context value
interface GlobalContextProps {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
}

// Create context with default values
const GlobalContext = createContext<GlobalContextProps>({
  isLogged: false,
  setIsLogged: () => {},
  user: null,
  setUser: () => {},
  loading: true,
});

export const useGlobalContext = () => useContext(GlobalContext);

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      
      try {
        // console.log("Fetching current user...");
        const res = await getCurrentUser();
        if (res) {

          setIsLogged(true);
          setUser(res);
        } else {
          console.log("No user found");
          setIsLogged(false);
          setUser(null);
        }
      } catch (error) {
        // console.error("Error fetching current user:", error);
      } finally {
        // console.log("Setting loading to false");
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);
console.log(loading);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
