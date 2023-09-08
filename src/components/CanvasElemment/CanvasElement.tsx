// CanvasElement.tsx
import React, { useEffect, useRef } from 'react';
import { usePosition } from '../../hooks/usePosition/usePosition';
import { useElement } from '../../hooks/useElement/useElement';
import { useCanvasSize } from '@/hooks/useCanvasSize/useCanvasSize';
import { useCanvasZoom } from '../../hooks/useCanvasZoom/useCanvasZoom'; // Import the new hook
import styles from './CanvasElement.module.css';
import { InfiniteCanvas } from '@/class/InfiniteCanvas';

interface CanvasElementProps {
  elementsToDraw: { type: string }[];
}

export const CanvasElement: React.FC<CanvasElementProps> = ({
  elementsToDraw,
}) => {
  const { canvasRef, mousePosition } = usePosition();
  const { drawElement } = useElement({ canvasRef, elementsToDraw });
  const { size } = useCanvasSize();
  const zoomLevel = useCanvasZoom(canvasRef, mousePosition); // Use the new hook to get the zoom level

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      canvas.width = size.width;
      canvas.height = size.height;
    }

    drawElement();
  }, [drawElement, canvasRef, size.width, size.height, zoomLevel]);

  const infiniteCanvas = new InfiniteCanvas(30);
  document.addEventListener("contextmenu", (e) => e.preventDefault(), false);

  return (
    <div className={styles.container}>
      <canvas
        id='canvas'
        ref={canvasRef}
        className={styles.canvasStyle}
        width={size.width}
        height={size.height}
      />
      <div className={styles.controls}>
        <button onClick={() => infiniteCanvas.zoom(1.05)}>+</button>
        <button onClick={() => infiniteCanvas.zoom(0.95)}>-</button>
        <button onClick={() => infiniteCanvas.offsetLeft(10)}>L</button>
        <button onClick={() => infiniteCanvas.offsetRight(10)}>R</button>
        <button onClick={() => infiniteCanvas.offsetUp(10)}>^</button>
        <button onClick={() => infiniteCanvas.offsetDown(10)}>v</button>
      </div>
    </div>
  );
};
