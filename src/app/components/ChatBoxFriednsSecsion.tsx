import React from 'react'
import FriendListCard from './FriendListCard'
import {  LogOutIcon } from 'lucide-react'
import Icons from './Icons'

function ChatBoxFriednsSecsion() {
  return (
    <div className="w-[350px] bg-[#5A8EFF] tet-white h-screen px-5">
        <div className='my-5 '>
            <FriendListCard/>
        </div>
        <div className='flex text-white gap-1.5 items-center cursor-pointer'>
            <Icons Icon={LogOutIcon}/> <h3 className='text-sm'>Logout</h3>
        </div>
    </div>
)
}

export default ChatBoxFriednsSecsion