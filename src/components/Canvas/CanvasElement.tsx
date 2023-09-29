'use client'

import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { CanvasInstance } from './CanvasInstance';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

let socket;

export const CanvasElement = () => {
  const [ isConnected, setIsConnected ] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      console.log('start connexion');
      socket = io('http://localhost:8080/', {
        path: "/sqlizer/",
        transportOptions: {
          polling: {
            extraHeaders: {
              BearerToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA1ZTkzNGU3LTgyMjAtNDY1My1hZjViLWI2MDM0MTY2OTY4MiIsImlhdCI6MTY5NTY2NDA4OSwiZXhwIjoxNjk2MjY4ODg5fQ._nRo_qloXaj-j4YFzVzOByFK4tJUlFDrJiCi6uZ16pY"
            }
          }
        }
      });
      console.log(socket);
      setIsConnected(true);
    }
  }, [isConnected])

  // socket.on('lorem', () => {
  //   console.log('ipsum');
  // })

  // socket.on('error', data => {
  //   console.log('error');
  //   console.log(data);
  // })

  return (
    <>
      <ReactFlowProvider>
        <CanvasInstance />
      </ReactFlowProvider>
    </>
  )
}