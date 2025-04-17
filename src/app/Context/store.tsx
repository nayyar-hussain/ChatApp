"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState} from "react";

// Define interfaces for your data structures
interface IFR {
  _id : string
  receiverId : string,
  status : string,
  sender : {
    ImageUrl : string,
    bio : string,
    name : string
  }
  senderId : string
}

interface IFriend {
  _id : string
  userId : string,
  status : string,
  friend : {
    ImageUrl : string,
    bio : string,
    name : string
  }
  friendId : string
}

interface AppContextValue {
  user: ReturnType<typeof useUser>["user"];
  userId: string | null | undefined;
  isLoaded: boolean;
 FRequest : IFR[]
 Friend : IFriend[]
 handleFetchFriendRequest : () => Promise<void>
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


  const [FRequest, setFRequest] = useState<IFR[]>([])
  const [Friend, setFriend] = useState<IFriend[]>([])


  interface IApiResponse {
    msg : string,
    status : number,
    populatedRequests : IFR[]
  }

  const handleFetchFriendRequest = async () => {
    
  
    try {
      const {data} = await axios.get<IApiResponse>(`/api/Friend-Request?userId=${userId}`)
      setFRequest(data.populatedRequests);
      
      
      
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
   if(userId){
    handleFetchFriendRequest()
   }
  }, [userId])

  // Friends fetching

  interface IApiResponseFriend {
    msg : string,
    status : number,
    Friends : IFriend[]
  }

  const handleFetchFriends = async () => {
    
  
    try {
      const {data} = await axios.get<IApiResponseFriend>(`/api/Friends?userId=${userId}`)
      setFriend(data.Friends);
      console.log(data);
      
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
   if(userId){
    handleFetchFriends()
   }
  }, [userId])
  
  const value: AppContextValue = {
    user,
    userId,
    isLoaded,
    FRequest,
    handleFetchFriendRequest,
    Friend
    
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextValue => useContext(AppContext);