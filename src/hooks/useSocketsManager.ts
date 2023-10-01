import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { getToken } from '@/utils/auth.utils';

let socket: Socket;

export const useSocketManager = () => {
  const url = process.env.API_URL
  if (!url) throw new Error("url is not defined");

  useEffect(() => {
    console.log('Start connexion');

    const roomId = "fa1a2ace-f8da-4eb4-b123-2a816252d3aa";

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
    socket.on("responseCreateTable", (data) => console.log(data));
  }, [url])
}