import { useEffect } from 'react';
import { usePosition } from '../../hooks/usePosition/usePosition';
import { useElement } from '../../hooks/useElement/useElement';
import styles from './CanvasElement.module.css';

interface CanvasElementProps {
  elementToDraw: string;
  canvasWidth: number;
  canvasHeight: number
}

export const CanvasElement: React.FC<CanvasElementProps> = ({
  elementToDraw,
  canvasWidth,
  canvasHeight
}) => {
  const { canvasRef } = usePosition();
  const { drawElement } = useElement({ canvasRef, elementToDraw });

  useEffect(() => {
    // Set the canvas width and height
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    }

    drawElement();
  }, [drawElement, canvasRef, canvasWidth, canvasHeight]);

  return <canvas ref={canvasRef} className={styles.canvasStyle} />;
};
