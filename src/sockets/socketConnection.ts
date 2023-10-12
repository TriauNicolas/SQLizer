import { io, Socket } from "socket.io-client";
import { getToken } from '@/utils/auth.utils';

export const socketConnection = () => {
  console.log("Start connection")
  
  const url = process.env.API_URL
  if (!url) throw new Error("url is not defined");
  
  const roomId = "ea95d9c6-152b-4c85-ba1c-27a919edf13f";
  
  const socket: Socket = io(url, {
    path: "/sqlizer/",
    query: {
      room: roomId,
    },
    transportOptions: {
      polling: {
        extraHeaders: {
          BearerToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNkMWJmZTUzLTk3ODItNDhjYy1iNjIyLTdlMTMyMjhiODRkNCIsImlhdCI6MTY5NzA2Njk1MywiZXhwIjoxNjk3NjcxNzUzfQ.gmls57_n5WLMablqeEr4IghF0gEwIZscfaxT16FA37k'
        }
      }
    }
  });
  
  console.log(socket)
  socket?.on('socketError', (data: any) => console.log(data));  
  console.log("Connection successful")

  return socket
}
