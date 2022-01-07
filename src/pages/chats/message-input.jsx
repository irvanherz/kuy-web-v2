import { ArrowRightIcon } from "@heroicons/react/solid"
import useSocket from "components/socket/use-socket"
import { useState } from "react"

export default function MessageInput(){
  const socket = useSocket()
  const [message, setMessage] = useState('')

  const handleSend = () => {
    console.log('test');
    socket.emit('chats/messages/create', {
      chat_room_id: 1,
      message,
      user_id: 1,
      organizer_id: 1,
    })
  }

  return (
    <div className='flex'>
      <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Tulis pesan Anda..." className='outline-none w-full p-3' />
      <button disabled={!message} onClick={handleSend} className='bg-blue-600 hover:bg-blue-400 disabled:bg-blue-300 disabled:cursor-default text-white flex items-center p-3'><span className='font-bold'>Kirim</span><ArrowRightIcon className='w-5 h-5 ml-2' /></button>
    </div>
  )
}