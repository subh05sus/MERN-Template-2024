import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import Toast, { showToast } from "../components/Toast";
import * as apiClient from '../api-client';

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContextType = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void; // Added setLoggedIn
  userId: string | undefined;
  isAdmin: boolean;
};

const AppContext = React.createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state

  const { isError, data } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });

  const userId = data?.userId;
  const isAdmin = data?.isAdmin;

  // Update isLoggedIn based on the query result
  useEffect(() => {
    setIsLoggedIn(!isError);
  }, [isError]);

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          showToast(toastMessage.message, toastMessage.type);
        },
        isLoggedIn: isLoggedIn,
        setLoggedIn: setIsLoggedIn, // Provide setLoggedIn to context
        userId: userId,
        isAdmin: isAdmin,
      }}
    >
      <Toast />
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
