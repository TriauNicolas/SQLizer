import { io, Socket } from "socket.io-client";
import { getToken } from '@/utils/auth.utils';
import { Table } from "@/types/tables";
import { useState } from "react";

let socket: Socket;

export const useSocketManager = () => {
  const [ isConnected, setIsConnected ] = useState(false);

  const url = process.env.API_URL
  if (!url) throw new Error("url is not defined");

  // Connect to the database canvas
  const connectionSocket = () => {
    console.log('Start connexion');

    const roomId = "57e80cce-cf3d-4792-8509-aea0c6d374cc";

    socket = io(url, {
      path: "/sqlizer/",
      query: {
        room: roomId,
      },
      transportOptions: {
        polling: {
          extraHeaders: {
            BearerToken: getToken()
          }
        }
      }
    });

    console.log(socket);
    socket.on("socketError", (data) => console.log(data));
    if (socket) setIsConnected(true);
  }

  ///// SEND SOCKET /////
  // Create table
  const addTableSocket = (table: Table) => {
    console.log(table);
    socket.emit("requestCreateTable", table);
  }

  ///// RESPONSES FROM SOCKET /////
  if (isConnected) {
    socket.on("responseCreateTable", (data) => console.log(data.table));
  }



  return { connectionSocket, addTableSocket }
}