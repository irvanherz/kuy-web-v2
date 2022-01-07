import { ReactNode, useEffect, useState } from "react"
import SocketContext from "./context"
import { io, ManagerOptions, Socket, SocketOptions } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";

interface SocketProviderProps {
  children: ReactNode,
}
export default function SocketProvider({ children }: SocketProviderProps) {
  const authStatus = useSelector<RootState, string>(state => state.auth.status)
  const authToken = useSelector<RootState, string>(state => state.auth.token)
  const [socket, setSocket] = useState<Socket>()
  const [status, setStatus] = useState<string>('idle')

  useEffect(() => {
    let conn: Socket | null = null
    if (authStatus === 'authenticated') {
      conn = io('http://localhost:5002', { auth: { token: authToken } })
      conn.on('connect', () => setStatus('connected'))
      conn.on('close', () => setStatus('closed'))
      setSocket(conn)
    } else {
      setSocket(undefined)
    }
    return () => {
      if (conn) {
        conn.removeAllListeners()
        conn.disconnect()
        setStatus('idle')
        setSocket(undefined)
      }
    }
  }, [authStatus, authToken])

  // const disconnect = () => {
  //   socket.
  // }

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}