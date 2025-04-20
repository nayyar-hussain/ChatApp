"use client";
import { Bell } from "lucide-react";
import Icons from "./Icons";
import UserNavIcon from "./UserNavIcon";
import FriendRequestBox from "./FriendRequestBox";
import { useAppContext } from "../Context/store";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

export default function Navbar() {
    const { FRequest , userId, handleFetchFriendRequest } = useAppContext();
    const [friendListPopup, setfriendListPopup] = useState(false)

    const handleFriend = async (friendId : string) => {
      try {
        const {data} = await axios.post('/api/Friends', { friendId , userId})
        if(data.status === 200) {
            toast.success('Friend Request Accepted')
            handleFetchFriendRequest()
        }
      } catch (error) {
        console.log(error);
        
      }
        
    }
    return (
        <div className="w-full flex justify-between items-center py-5 bg-[#298acd] px-5">
            <UserNavIcon />
            <div className="relative flex items-center">
                <div onClick={() =>setfriendListPopup(!friendListPopup)}>

                <Icons  Icon={Bell} />
                </div>
                {/* Friend Requests Dropdown */}
                <div className={!friendListPopup ? "hidden" : ''}>

                {FRequest.length > 0 ? (
                    <div className="absolute right-0 top-10 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-10">
                        <div className="flex justify-between items-center p-4 border-b border-gray-200">
                            <h3 className="font-semibold text-gray-800">Friend Requests</h3>
                            <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                {FRequest.length} new
                            </span>
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                            {FRequest.map((frequest) => (
                                <FriendRequestBox
                                handleFriend={handleFriend}
                                    key={frequest._id} // Unique MongoDB ID
                                    senderId={frequest.senderId}
                                    ImageUrl={frequest.sender?.ImageUrl || "/default-avatar.png"}
                                    name={frequest.sender?.name || "Unknown"}
                                    bio={frequest.sender?.bio || "No bio"}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="absolute right-0 top-10 w-72 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-10">
                        <p className="text-gray-500 text-sm">No friend requests</p>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
}