'use client'

import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { CanvasInstance } from './CanvasInstance';
import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { socketConnection } from '@/sockets/socketConnection';

export let socket: Socket
interface Props {
  token: string,
  databaseId: string
}
export const CanvasElement = ({token, databaseId}: Props) => {
  useEffect(() => {
    if (!socket) socket = socketConnection(token, databaseId);
  }, [token, databaseId])

  return (
    <>
      <ReactFlowProvider>
        <CanvasInstance />
      </ReactFlowProvider>
    </>
  )
}