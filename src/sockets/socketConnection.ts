import { io, Socket } from "socket.io-client";
import { getToken } from '@/utils/auth.utils';

export const socketConnection = () => {
  console.log("Start connection")
  
  const url = process.env.API_URL
  if (!url) throw new Error("url is not defined");
  
  const roomId = "d31d401f-b277-4940-b28d-7625db7224b9";
  
  const socket: Socket = io(url, {
    path: "/sqlizer/",
    query: {
      room: roomId,
    },
    transportOptions: {
      polling: {
        extraHeaders: {
          BearerToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZhNjliOWU3LWMwMGItNDM4Mi1iNTExLTBlM2Q5OGRkZTgyNiIsImlhdCI6MTY5NzI1MjE5MCwiZXhwIjoxNjk3ODU2OTkwfQ.aZdtn066i30BWFW0H6Lw7fJbnk9za4uA5zh8iIue2GQ'
        }
      }
    }
  });
  
  console.log(socket)
  socket?.on('socketError', (data: any) => console.log(data));
  console.log("Connection successful")

  return socket
}
