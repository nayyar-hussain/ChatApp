import Image from "next/image";
import React from "react";

interface IFRProps {
    ImageUrl: string;
    name: string;
    bio: string;
    senderId : string,
    handleFriend : (friendId : string) =>  Promise<void>
}

function FriendRequestBox({ ImageUrl, name, bio , senderId , handleFriend}: IFRProps) {
    return (
        <div className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
            <div className="flex items-center space-x-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Image
                        src={ImageUrl}
                        alt={name}
                        width={40}
                        height={40}
                        className="object-cover"
                    />
                </div>
                <div>
                    <h4 className="text-sm font-medium text-gray-900">{name}</h4>
                    <p className="text-xs text-gray-500">{bio || "No user bio"}</p>
                </div>
            </div>
            <div className="flex space-x-2">
                <button
                onClick={() => handleFriend(senderId) }
                    aria-label={`Accept friend request from ${name}`}
                    className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded"
                >
                    Accept
                </button>
                <button
                    aria-label={`Reject friend request from ${name}`}
                    className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-medium px-3 py-1 rounded"
                >
                    Reject
                </button>
            </div>
        </div>
    );
}

export default FriendRequestBox;