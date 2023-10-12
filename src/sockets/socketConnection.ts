import { io, Socket } from "socket.io-client";
import { getToken } from '@/utils/auth.utils';

console.log("Start connection")

const url = process.env.API_URL
if (!url) throw new Error("url is not defined");

const roomId = "8b1b796f-5913-4e96-934a-e6cc98906da4";

export const socket: Socket = io(url, {
  path: "/sqlizer/",
  query: {
    room: roomId,
  },
  transportOptions: {
    polling: {
      extraHeaders: {
        BearerToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMzNjdmM2Y2LWM0ZWUtNDQ2MS1hN2M1LWM4MGQ2N2QzZWIxNSIsImlhdCI6MTY5NjQ5ODc3MiwiZXhwIjoxNjk3MTAzNTcyfQ.hk1x0Pn6GTpWVOsTmTo4YBLxT2eZH4T9tf0DV1yeZT0'
      }
    }
  }
});

if (socket) {
  console.log("Connection successful")
  console.log(socket)
}
