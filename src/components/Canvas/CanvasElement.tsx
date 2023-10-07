'use client'

import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { CanvasInstance } from './CanvasInstance';
import { useEffect, useState } from 'react';
import { useSocketListeners } from '@/sockets/useSocketListener';
import { socketEvents } from '@/types/socketEvent';
import { Socket, io } from 'socket.io-client';

export let socket: Socket
 
export const CanvasElement = () => {
  // const { getSocketTable } = useAddTableNode();
  const { eventToTrigger, relatedData }: socketEvents = useSocketListeners();

  useEffect(() => {
    console.log("Start connection")
  
    const url = process.env.API_URL
    if (!url) throw new Error("url is not defined");
    
    const roomId = "ea95d9c6-152b-4c85-ba1c-27a919edf13f";
  
    socket = io(url, {
      path: "/sqlizer/",
      query: {
        room: roomId,
      },
      transportOptions: {
        polling: {
          extraHeaders: {
            BearerToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNkMWJmZTUzLTk3ODItNDhjYy1iNjIyLTdlMTMyMjhiODRkNCIsImlhdCI6MTY5NjQ2MDQwNywiZXhwIjoxNjk3MDY1MjA3fQ.Mpqkni1e69t-dQ970R928xE1mqgPIFRtfOxxUIaJP3o'
          }
        }
      }
    });
    
    console.log(socket.connected)
    socket.on('connect', () => {
      console.log(socket.connected)
      socket.on('responseCreateTable', (data) => console.log("pute"))
    })
    socket.on('socketError', (data) => console.log(data));

    
    // socket.on('responseCreateTable', (data) => {
    //   console.log("----------------")
    //   console.log("SooS Salope")
    //   console.log(data)
    // });
  
    console.log("Connection successful")
    // console.log(socket)
  }, [])


  useEffect(() => {
    console.log(eventToTrigger)
    console.log(relatedData)
  }, [eventToTrigger, relatedData])

  return (
    <>
      <ReactFlowProvider>
        <CanvasInstance eventToTrigger={eventToTrigger} relatedData={relatedData} />
      </ReactFlowProvider>
    </>
  )
}