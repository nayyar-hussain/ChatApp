'use client'; // Mark as client component

import AddFriendCard from '@/app/components/AddFriendCard';
import Container from '@/app/components/Container';
import Icons from '@/app/components/Icons';
import { useAppContext } from '@/app/Context/store';
import axios from 'axios';
import { SendHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { toast } from 'react-toastify';

// Define the User interface for individual users
interface User {
  _id: string;
  name: string;
  email: string;
  ImageUrl: string;
  bio?: string;
  createdAt: string;
}

// Define the API response interface
interface ApiResponse {
  status: number;
  users: User[];
  msg?: string;
}

const AddFriend: React.FC = () => {
  const { userId } = useAppContext();
  const [users, setUsers] = useState<User[]>([]);
  const [filterUser, setfilterUser] = useState<User[]>([]);
  const [searchFriend, setsearchFriend] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<ApiResponse>('/api/user');
        const { data } = response;
        if (data.status === 200 && Array.isArray(data.users)) {
          setUsers(data.users);
          setfilterUser(data.users); // Initialize filterUser with all users
        } else {
          setError(data.msg || 'Failed to fetch users');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle search input change
  const handleSearchFriend = () => {
    if (searchFriend === '') {
      setfilterUser(users); // Show all users when search is empty
    } else {
      const newUser = users.filter((user) =>
        user.name.toLowerCase().includes(searchFriend.toLowerCase())
      );
      setfilterUser(newUser);
    }
  };

  // Update searchFriend state on input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setsearchFriend(e.target.value);
    handleSearchFriend(); // Call search function on every change
  };

  // Handle adding a friend request
  const handleAddFriendRequest = async (rid: string) => {
    try {
      if (!rid) {
        setError('Receiver ID is missing, please try again');
        return;
      }
      const { data } = await axios.post('/api/user', { rid, userId });
      
      if (data.status == 200) {
        toast.success( 'Request sent');
        
      } else {
        toast.error("you are already friends")
      }
    } catch (error) {
      console.error(error);
      setError('Error occurred while sending friend request');
    }
  };

  // Render loading state
  if (loading) {
    return (
      <Container>
        <h1 className="text-2xl font-semibold my-10">ADD FRIENDS</h1>
        <div>Loading...</div>
      </Container>
    );
  }

  // Render error state
  

  return (
    <div className="py-10">
      <Container>
        <h1 className="text-2xl font-semibold my-10">ADD FRIENDS</h1>

        <div className="mt-4 flex rounded-full">
          <input
            type="text"
            placeholder="Search for friends..."
            value={searchFriend}
            onChange={handleInputChange}
            className="w-full h-[50px] p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div
            className="w-[80px] h-[50px] bg-blue-500 text-white flex justify-center items-center cursor-pointer rounded-r-lg"
          >
            <Icons Icon={SendHorizontal} />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filterUser.length === 0 ? (
            <p>No users found</p>
          ) : (
            filterUser.map((user) => (
              <AddFriendCard
                handleAddFriendRequest={handleAddFriendRequest}
                key={user._id}
                _id={user._id}
                name={user.name}
                imageUrl={user.ImageUrl}
                bio={user.bio}
                createdAt={user.createdAt}
              />
            ))
          )}
        </div>
      </Container>
      <div className="w-full text-center">
        <button
          onClick={() => router.push('/')}
          className="cursor-pointer bg-blue-500 font-semibold text-white rounded p-2 my-10"
        >
          Go To Chat Box
        </button>
      </div>
    </div>
  );
};

export default AddFriend;