import { SendHorizontal } from 'lucide-react';
import React from 'react'
import Icons from './Icons';

const messages = [
    { sender: 'me', text: 'Hello! Kaise ho Rizwan kaha gum aj kal?', time: '10:00 AM' },
    { sender: 'other', text: 'Main theek hoon! Tum sunao bas yahi accontant lag gaya hun or apna bata.', time: '10:01 AM' },
    { sender: 'me', text: 'Sab badhiya! Kya kar rahe ho me to millionare ban gaya hu USA shift ho gaya hun waha ki larki se shadi kar liya?', time: '10:02 AM' },
    { sender: 'other', text: 'Shadi me q nhi bulaya tere liye usa ajate or bache hue bivi gori he ya kali.', time: '10:03 AM' },
    { sender: 'me', text: 'kali ho ya gori tuje kia karna he ab picture nhi mang lei yo.', time: '10:04 AM' },
    { sender: 'other', text: 'Phir baad mein baat karte hain.', time: '10:05 AM' },
    { sender: 'me', text: 'Theek hai, bye!', time: '10:06 AM' },
    { sender: 'other', text: 'Apna khayal rakh help chai ho to bata dena koi upar ki field me dal den ge', time: '10:06 AM' },
    { sender: 'me', text: 'sach batao to chaprasi ki nokri lagi he laga de koi upar ki field me', time: '10:06 AM' },
];

function ChatboxChatBox() {
    return (
        <div className="flex-1 bg-slate-200">
<div className="flex flex-col h-screen bg-gray-100 p-4">
  {/* Messages Container (Top) */}
  <div className="flex-1 overflow-y-auto  flex flex-col">
    {/* Messages will be displayed in normal order (new messages at the bottom) */}
    {messages.map((message, index) => (
      <div
        key={index}
        className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
      >
        <div
          className={`p-3 px-5 rounded-tr-none rounded-full max-w-[70%] mb-10 ${
            message.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-white'
          }`}
        >
          <p>{message.text}</p>
          
        </div>
      </div>
    ))}
  </div>

  {/* Search Bar (Bottom) */}
  <div className="mt-4 flex rounded-full overflow-hidden">
    <input
      type="text"
      placeholder="Type a message..."
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <div className='w-[80px] h-full bg-blue-500 text-white flex justify-center items-center'>
        <Icons Icon={SendHorizontal}/>
       
    </div>
  </div>
</div>
        </div>
    )
}

export default ChatboxChatBox