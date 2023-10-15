import { io, Socket } from "socket.io-client";
// import { getToken } from '@/utils/auth.utils';

export const socketConnection = () => {
  console.log("Start connection")
  
  const url = process.env.API_URL
  if (!url) throw new Error("url is not defined");
  
  const roomId = "32b4a4a6-1f98-4862-932b-059f0b72f06c";
  
  const socket: Socket = io(url, {
    path: "/sqlizer/",
    query: {
      room: roomId,
    },
    transportOptions: {
      polling: {
        extraHeaders: {
          BearerToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFhOGRmNzU5LTA5ZDQtNGFiMy05Y2U1LTFjNjBiZDRlNGRiOSIsImlhdCI6MTY5NzMwNzAzMywiZXhwIjoxNjk3OTExODMzfQ.O-vuqIzEvjcVtVFo0FGd8dvOtksCmLc8_4AzrEImJys'
        }
      }
    }
  });
  
  socket?.on('socketError', (data: any) => console.log(data));
  console.log("Connection successful")

  return socket
}
