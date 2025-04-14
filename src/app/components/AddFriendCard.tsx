import Image from 'next/image';
import React from 'react';

interface IAddFriendCardProps {
  clerkUserId : string
  name: string;
  imageUrl: string;
  bio?: string;
  createdAt: string;
  handleAddFriendRequest : (_id : string)  => Promise<void>
}

function AddFriendCard({ clerkUserId, name, imageUrl, bio, createdAt , handleAddFriendRequest}: IAddFriendCardProps) {
  // Format createdAt date
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
      <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300  mx-auto w-full">
        <div className="relative mx-auto w-[120px] h-[120px] my-4">
          {imageUrl ? (
            <Image
              className="rounded-full object-cover"
              src={imageUrl}
              height={120}
              width={120}
              alt={`${name}'s profile picture`}
            />
          ) : (
            <div className="bg-gradient-to-br from-pink-400 to-purple-500 rounded-full w-full h-full flex items-center justify-center text-white text-2xl font-bold">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <h1 className="mb-2 text-xl font-bold text-gray-800">{name}</h1>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{bio || 'No bio available'}</p>
        <p className="text-gray-400 text-xs mb-4">Joined: {formattedDate}</p>
        <button onClick={() => handleAddFriendRequest(clerkUserId)}  className= "cursor-pointer bg-blue-500 text-white rounded-lg py-2 px-4 w-full font-medium hover:bg-blue-600 transition-colors duration-200">
          Add Friend
        </button>
      </div>
  );
}

export default AddFriendCard;