'use client'

import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { CanvasInstance } from './CanvasInstance';
import { useEffect } from 'react';
import { useSocketManager } from '@/hooks/useSocketsManager'

export const CanvasElement = () => {
  const { connectionSocket } = useSocketManager();

  // Connection Socket Room
  useEffect(() => {
    connectionSocket();
  })

  return (
    <>
      <ReactFlowProvider>
        <CanvasInstance />
      </ReactFlowProvider>
    </>
  )
}