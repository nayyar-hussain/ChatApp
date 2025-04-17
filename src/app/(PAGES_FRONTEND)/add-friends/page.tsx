'use client'; // Mark as client component since we're using useEffect and axios

import AddFriendCard from '@/app/components/AddFriendCard';
import Container from '@/app/components/Container';
import Icons from '@/app/components/Icons';
import { useAppContext } from '@/app/Context/store';
import axios from 'axios';
import { SendHorizontal } from 'lucide-react';
import React, { useState, useEffect } from 'react';

// Define the User interface for individual users
interface User {
  _id: string;
  name: string;
  email: string;
  ImageUrl: string; // Changed to camelCase for consistency
  bio?: string;
  createdAt: string; // Assuming API returns ISO date string
}

// Define the API response interface
interface ApiResponse {
  status: number;
  users: User[];
  msg?: string;
}

const AddFriend: React.FC = () => {
  const { userId } = useAppContext()
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleAddFriendRequest = async (rid: string) => {
    try {
      if (!rid) {
        setError("reciver id block try again")
      }
      const { data } = await axios.post('/api/user', { rid, userId })
      console.log(data);


    } catch (error) {
      console.log(error);
      
      setError("ERror found while ");

    }
  }

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<ApiResponse>('http://localhost:3000/api/user');
        const { data } = response;
        if (data.status === 200 && Array.isArray(data.users)) {
          setUsers(data.users);
          
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
  if (error) {
    return (
      <Container>
        <h1 className="text-2xl font-semibold my-10">ADD FRIENDS</h1>
        <div>Error: {error}</div>
      </Container>
    );
  }

  return (
    <div>
      <Container>
        <h1 className="text-2xl font-semibold my-10">ADD FRIENDS</h1>

        <div className="mt-4 flex rounded-full">
          <input
            type="text"
            placeholder="Search for friends..."
            className="w-full h-[50px] p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="w-[80px] h-[50px] bg-blue-500 text-white flex justify-center items-center cursor-pointer rounded-r-lg">
            <Icons Icon={SendHorizontal} />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            users.map((user) => (
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
    </div>
  );
};

export default AddFriend;