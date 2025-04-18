"use client"
import React, { useState } from 'react'
import FriendListCard from './FriendListCard'
import {  LogOutIcon, UserPlus } from 'lucide-react'
import Icons from './Icons'
import { useRouter } from 'next/navigation'
import { useAppContext } from '../Context/store'

function ChatBoxFriednsSecsion() {
    
    const { Friend , burger } = useAppContext()
    const router = useRouter()

    
  return (
    <>
    <div className={` overflow-hidden md:w-[350px] bg-[#298acd] tet-white md:p-5 ${burger ?" w-full p-5" : "w-0 p-0"}`}>
        <div className='my-5 '>
            {
            Friend.map((frd) => (

                <FriendListCard key={frd._id} friendId={frd.friendId} name={frd.friend.name} bio={frd.friend.bio} ImageUrl={frd.friend.ImageUrl}/>
            ))
            }
        </div>
        <div onClick={() => router.push('/add-friends')} className='flex text-white gap-1.5 items-center cursor-pointer'>
            <Icons Icon={UserPlus }/> <h3 className='text-sm py-5 '>Add Friends</h3>
        </div>
       
    </div>
    </>
)
}

export default ChatBoxFriednsSecsion