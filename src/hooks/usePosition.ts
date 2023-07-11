import { useEffect, useRef } from 'react';

export const usePosition = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const mouseHandler = (event: MouseEvent) => {
      const currentMousePosition = computeMouseInCanvas(event)

      console.log(currentMousePosition)

      // if(!canvasRef.current?.getContext('2d') || !currentMousePosition) return
      // const ctx = canvasRef.current?.getContext('2d')
    }

    const computeMouseInCanvas = (event: MouseEvent) => {
      if(!canvasRef.current) return
      const canvas = canvasRef.current;

      const canvasBorders = canvas?.getBoundingClientRect()
      const x = event.clientX - canvasBorders.left
      const y = event.clientY - canvasBorders.top

      return { x, y }
    }

    // listener on mouse
    canvasRef.current?.addEventListener('mousemove', mouseHandler)

    // Remove event listener for leak memory
    return () => canvasRef.current?.addEventListener('mousemove', mouseHandler)
  }, [])

    return { canvasRef }
};