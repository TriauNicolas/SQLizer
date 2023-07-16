import { useEffect } from 'react';
import { usePosition } from '../hooks/usePosition'
import { useElement } from '../hooks/useElement'
import styles from '../app/page.module.css';

interface CanvasElementProps {
  elementToDraw: string
}

export const CanvasElement: React.FC<CanvasElementProps> = ({ elementToDraw }) => {
  const { canvasRef } = usePosition()
  const { drawElement } = useElement({ canvasRef, elementToDraw });

  useEffect(() => {
    drawElement();
  }, [drawElement, canvasRef]);


  return <canvas ref={canvasRef} className={styles.canvasStyle} />
}