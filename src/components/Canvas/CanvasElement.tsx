'use client'

import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { CanvasInstance } from './CanvasInstance';
import { useEffect, useState } from 'react';
import { useSocketListeners } from '@/sockets/useSocketListener';
import { socketEvents } from '@/types/socketEvent';
import { Socket, io } from 'socket.io-client';
import { socketConnection } from '@/sockets/socketConnection';

export let socket: Socket
 
export const CanvasElement = () => {
  useEffect(() => {
    if (!socket) socket = socketConnection();
  }, [])

  return (
    <>
      <ReactFlowProvider>
        <CanvasInstance />
      </ReactFlowProvider>
    </>
  )
}