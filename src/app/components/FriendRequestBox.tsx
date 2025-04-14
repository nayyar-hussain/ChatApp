import Image from 'next/image'
import React from 'react'

function FriendRequestBox() {
  return (
    <div className="mr-5  absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-10">
    {/* Header */}
    <div className="flex justify-between items-center p-4 border-b border-gray-200">
      <h3 className="font-semibold text-gray-800">Friend Requests</h3>
      <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
        {'lenth'} new
      </span>
    </div>

    {/* Requests List */}
    <div className="max-h-80 overflow-y-auto">
     
        <div
          key={'dd'}
          className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
        >
          <div className="flex items-center space-x-3">
            <div className="relative h-10 w-10 rounded-full overflow-hidden">
              <Image
                src={''}
                alt={'name'}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                {"name"}
              </h4>
              <p className="text-xs text-gray-500">
                {'mutal'} mutual friends
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded">
              Accept
            </button>
            <button className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-medium px-3 py-1 rounded">
              Reject
            </button>
          </div>
        </div>
   
    </div>

  
  </div>
  )
}

export default FriendRequestBox