import { useEffect, RefObject, useCallback } from 'react';

interface UseElementProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  elementToDraw: string;
}

export const useElement = ({ canvasRef, elementToDraw }: UseElementProps) => {
  const drawElement = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (elementToDraw === 'circle') {
      context.beginPath();
      context.arc(canvas.width / 2, canvas.height / 2, 50, 0, 2 * Math.PI);
      context.fillStyle = 'blue';
      context.fill();
      context.closePath();
    } else if (elementToDraw === 'rectangle') {
      context.fillStyle = 'red';
      context.fillRect(50, 50, 100, 100);
    }
  }, [elementToDraw, canvasRef]);

  useEffect(() => {
    drawElement();
  }, [drawElement]);

  return { drawElement };
};
