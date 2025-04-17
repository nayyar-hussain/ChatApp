"use client"
import React from 'react'
import FriendListCard from './FriendListCard'
import {  LogOutIcon, UserPlus } from 'lucide-react'
import Icons from './Icons'
import { useRouter } from 'next/navigation'
import { useAppContext } from '../Context/store'

function ChatBoxFriednsSecsion() {
    const { Friend } = useAppContext()
    const router = useRouter()
  return (
    <div className="w-[350px] bg-[#298acd] tet-white h-screen px-5">
        <div className='my-5 '>
            {
            Friend.map((frd) => (

                <FriendListCard key={frd._id} name={frd.friend.name} bio={frd.friend.bio} ImageUrl={frd.friend.ImageUrl}/>
            ))
            }
        </div>
        <div onClick={() => router.push('/add-friends')} className='flex text-white gap-1.5 items-center cursor-pointer'>
            <Icons Icon={UserPlus }/> <h3 className='text-sm py-5 '>Add Friends</h3>
        </div>
        <div className='flex text-white gap-1.5 items-center cursor-pointer'>
            <Icons Icon={LogOutIcon}/> <h3 className='text-sm'>Logout</h3>
        </div>
    </div>
)
}

export default ChatBoxFriednsSecsion