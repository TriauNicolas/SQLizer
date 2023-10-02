'use client'

import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { CanvasInstance } from './CanvasInstance';

export const CanvasElement = () => {

  return (
    <>
      <ReactFlowProvider>
        <CanvasInstance />
      </ReactFlowProvider>
    </>
  )
}