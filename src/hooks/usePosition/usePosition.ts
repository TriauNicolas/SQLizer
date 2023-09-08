// usePosition.ts
import { useEffect, useRef, useState } from 'react';

export const usePosition = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseHandler = (event: MouseEvent) => {
      const currentMousePosition = computeMouseInCanvas(event);

      if (currentMousePosition) {
        setMousePosition(currentMousePosition);
      }
    };

    const computeMouseInCanvas = (event: MouseEvent) => {
      if (!canvasRef.current) return null;
      const canvas = canvasRef.current;

      const canvasBorders = canvas.getBoundingClientRect();
      const x = event.clientX - canvasBorders.left;
      const y = event.clientY - canvasBorders.top;

      return { x, y };
    };

    // listener on mouse
    canvasRef.current?.addEventListener('mousemove', mouseHandler);

    // Remove event listener for memory leak prevention
    return () => canvasRef.current?.removeEventListener('mousemove', mouseHandler);
  }, []);

  return { canvasRef, mousePosition };
};
