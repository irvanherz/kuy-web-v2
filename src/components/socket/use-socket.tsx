import { useContext } from "react";
import SocketContext from "./context";

export default function useSocket(){
  const { socket } = useContext(SocketContext)
  return socket
}