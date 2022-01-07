import { createContext } from "react";
import { ManagerOptions, Socket, SocketOptions } from "socket.io-client";

interface SocketContextType {
  socket?: Socket,
}
const SocketContext = createContext <SocketContextType>({
  socket: undefined,
})

export default SocketContext