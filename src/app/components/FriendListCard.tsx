import Image from 'next/image'
import React from 'react'


interface IFriendProps {
  name : string,
  bio : string,
  ImageUrl : string
}
function FriendListCard({name , bio , ImageUrl} : IFriendProps) {

 
  return (
    <div className='w-full bg-[#329ce3] p-3 rounded flex  gap-3 text-white my-5 cursor-pointer'>
        <div className=' rounded-full w-[40px] h-[40px] overflow-hidden'>
          <Image
          src={ImageUrl}
          height={40}
          width={40}
          alt='User Image'
          />
        </div>
        <div>

        <h1>Friend Name</h1>
        <h3>I am Devel...</h3>
        </div>
    </div>
  )
}

export default FriendListCard