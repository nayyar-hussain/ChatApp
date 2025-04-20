"use client"
import React from 'react'
import FriendListCard from './FriendListCard'
import {   UserPlus } from 'lucide-react'
import Icons from './Icons'
import { useRouter } from 'next/navigation'
import { useAppContext } from '../Context/store'

function ChatBoxFriednsSecsion() {
    
    const { Friend , burger } = useAppContext()
    const router = useRouter()

    
  return (
    <>
    <div className={` overflow-hidden md:w-[350px] bg-[#298acd] tet-white md:p-5 ${burger ?" w-full p-5" : "w-0 p-0"}`}>
        <div className='flex flex-col gap-5 '>
            {
            Friend.map((frd) => (

                <FriendListCard key={frd._id} friendId={frd.friendId} name={frd.friend.name} bio={frd.friend.bio} ImageUrl={frd.friend.ImageUrl}/>
            ))
            }
        </div>
        <div onClick={() => router.push('/add-friends')} className=' py-5 flex text-white gap-1.5 items-center cursor-pointer'>
            <Icons Icon={UserPlus }/> <h3 className='text-sm  '>Add Friends</h3>
        </div>
        <div  className=' text-white '>
             <p className='text-[12px]  opacity-90'>&copy; Copyright By Nayyar Hussain</p>
        </div>
       
    </div>
    </>
)
}

export default ChatBoxFriednsSecsion