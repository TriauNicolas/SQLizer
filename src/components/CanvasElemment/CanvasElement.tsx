import { useEffect, useLayoutEffect, useState } from 'react';
import { usePosition } from '../../hooks/usePosition/usePosition';
import { useElement } from '../../hooks/useElement/useElement';
import { DrawnElement } from '@/types/drawnElements';
import styles from './CanvasElement.module.css';
import { useCanvasSize } from '@/hooks/useCanvasSize/useCanvasSize';

export const CanvasElement = (drawnElements: DrawnElement[] | any) => {
  const { canvasRef } = usePosition();
  const { drawElement } = useElement({ canvasRef, elementsToDraw });
  const { size } = useCanvasSize()

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    
    if (canvas) {
      canvas.width = size.width;
      canvas.height = size.height;
    }

    drawElement();
  }, [drawElement, canvasRef, size.width, size.height]);

  return <canvas ref={canvasRef} className={styles.canvasStyle} width={size.width} height={size.height} />;
};
