import Image from 'next/image'
import React from 'react'
import { useAppContext } from '../Context/store'


interface IFriendProps {
  name : string,
  bio : string,
  ImageUrl : string
  friendId : string

}
function FriendListCard({ friendId ,name , bio , ImageUrl } : IFriendProps) {

  const { setReceiverId ,setuserName} = useAppContext()

  const handleUserNameAndReciverId = () => {
    setReceiverId(friendId)
    setuserName(name)
  }
 
  return (
    <div onClick={() => handleUserNameAndReciverId()} className='w-full bg-[#329ce3] p-3 rounded flex  gap-3 text-white my-5 cursor-pointer'>
        <div className=' rounded-full w-[40px] h-[40px] overflow-hidden'>
          <Image
          src={ImageUrl}
          height={40}
          width={40}
          alt='User Image'
          />
        </div>
        <div>

        <h1>{name}</h1>
        <h3>{bio ? bio.slice(0 , 14) : 'No bio here'}</h3>
        </div>
    </div>
  )
}

export default FriendListCard