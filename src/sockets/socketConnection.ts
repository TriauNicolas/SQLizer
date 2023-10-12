import { io, Socket } from "socket.io-client";
// import { getToken } from '@/utils/auth.utils';

export const socketConnection = (token: string, roomId: string) => {
  console.log("Start connection")
  
  const url = process.env.API_URL
  if (!url) throw new Error("url is not defined");
  const socket: Socket = io(url, {
    path: "/sqlizer/",
    query: {
      room: roomId,
    },
    transportOptions: {
      polling: {
        extraHeaders: {
          BearerToken: token
        }
      }
    }
  });

  socket?.on('socketError', (data: any) => console.log(data));
  console.log("Connection successful")

  return socket
}
