"use client"
import React from 'react'
import FriendListCard from './FriendListCard'
import {  LogOutIcon, UserPlus } from 'lucide-react'
import Icons from './Icons'
import { useRouter } from 'next/navigation'

function ChatBoxFriednsSecsion() {

    const router = useRouter()
  return (
    <div className="w-[350px] bg-[#5A8EFF] tet-white h-screen px-5">
        <div className='my-5 '>
            <FriendListCard/>
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