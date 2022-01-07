import { ArrowRightIcon } from "@heroicons/react/solid";
import useSocket from "components/socket/use-socket";
import { useEffect } from "react";
import MessageInput from "./message-input";

export default function Chats() {
  const socket = useSocket()

  useEffect(() => {
    console.log("SOOOOOOOOOOOOO", socket);
    socket && socket.emit('hello')
  }, [socket?.connected])
  return (
    <div className='flex' style={{ minHeight: 'inherit' }}>
      <div className='w-3/12'>
        <div className='p-3 border-b'>
          Meong
        </div>
      </div>
      <div className='w-6/12 border-l flex flex-col'>
        <div className='p-3 border-b'>
          Lawan Bicara
        </div>
        <div className='flex-1'>
          <div className='flex m-3'>
            <div className='p-3 bg-gray-100 rounded-full w-10 h-10 mr-3'></div>
            <div className='p-3 bg-gray-100 rounded-lg'>Chat</div>
          </div>
          <div className='flex m-3 flex-row-reverse'>
            <div className='p-3 bg-gray-100 rounded-full w-10 h-10 ml-3'></div>
            <div className='p-3 bg-blue-600 text-white rounded-lg'>Chat</div>
          </div>
        </div>
        <div className='border-t'>
          <MessageInput />
        </div>
      </div>
      <div className='w-3/12 border-l'>
        Attachment
      </div>
    </div>
  )
}