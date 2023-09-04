import { useEffect, RefObject, useCallback } from 'react';

interface UseElementProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  elementsToDraw: {type: string}[];
}

export const useElement = ({ canvasRef, elementsToDraw }: UseElementProps) => {
  const drawElement = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const middleXCanvas = (canvas.width / 2) - 60;
    const middleYCanvas = (canvas.height / 2) - 50;

    context.clearRect(0, 0, canvas.width, canvas.height);

    for(let elementIndex = 0; elementIndex < elementsToDraw?.length; elementIndex++) {
      if (elementsToDraw[elementIndex].type === 'blank') {
        context.lineWidth = 2
        context.beginPath();
        
        // Background
        context.fillStyle = 'rgba(255, 255, 255, 1)';
        context.fillRect(middleXCanvas, middleYCanvas, 200, 300);

        // Title
        context.strokeRect(middleXCanvas, middleYCanvas, 200, 50);
        context.strokeRect(middleXCanvas, middleYCanvas, 200, 50);

        // Body
        context.strokeRect(middleXCanvas, middleYCanvas, 200, 300);
        context.closePath();
      }
    }
  }, [elementsToDraw, canvasRef]);

  useEffect(() => {
    drawElement();
  }, [drawElement]);

  return { drawElement };
};
