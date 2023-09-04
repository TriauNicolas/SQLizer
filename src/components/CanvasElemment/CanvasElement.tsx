import { useEffect } from 'react';
import { usePosition } from '../../hooks/usePosition/usePosition';
import { useElement } from '../../hooks/useElement/useElement';
import styles from './CanvasElement.module.css';

interface CanvasElementProps {
  elementToDraw: string;
}

export const CanvasElement: React.FC<CanvasElementProps> = ({
  elementToDraw,
}) => {
  const { canvasRef } = usePosition();
  const { drawElement } = useElement({ canvasRef, elementToDraw });

  useEffect(() => {
    drawElement();
  }, [drawElement, canvasRef]);

  return <canvas ref={canvasRef} className={styles.canvasStyle} />;
};
