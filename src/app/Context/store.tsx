"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { createContext, ReactNode, useContext, useEffect} from "react";

// Define interfaces for your data structures

interface AppContextValue {
  user: ReturnType<typeof useUser>["user"];
  userId: string | null | undefined;
  isLoaded: boolean;
 
}


interface AppProviderProps {
  children: ReactNode;
}

// API response types

export const AppContext = createContext<AppContextValue>({} as AppContextValue);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { user } = useUser();
  const { userId, isLoaded } = useAuth();
 
    
  // function for fetch friend request

  interface IFR {
    receiverId : string,
    status : string,
    senderId : {
      imageUrl : string,
      bio : string,
      name : string
    }
  }

  interface IApiResponse {
    msg : string,
    status : number,
    FriendRequests : IFR
  }

  const handleFetchFriendRequest = async () => {
  
    try {
      const {data} = await axios.get<IApiResponse>(`/api/Friend-Request?userId=${userId}`)
      console.log(data);
      
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
   if(userId){
    handleFetchFriendRequest()
   }
  }, [userId])
  
  const value: AppContextValue = {
    user,
    userId,
    isLoaded,
    
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextValue => useContext(AppContext);