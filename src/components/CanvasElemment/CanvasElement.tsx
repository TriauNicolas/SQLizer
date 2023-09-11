import { useLayoutEffect } from 'react';
import { usePosition } from '@/hooks/usePosition/usePosition';
import { useDrawAll } from '../../hooks/useDrawAll/useDrawAll';
import { useCanvasSize } from '@/hooks/useCanvasSize/useCanvasSize';
import { TableElement } from '@/types/TableElement';
import { Relation } from '@/types/Relation';
import styles from './CanvasElement.module.css';

type CanvasElementProps = {
  drawnElements: TableElement[];
  drawnRelations: Relation[];
};

export const CanvasElement = ({ drawnElements, drawnRelations }: CanvasElementProps) => {
  const { canvasRef } = usePosition();
  const { size } = useCanvasSize();
  // Called drawAll because there are only Elements and Relations
  // Can be renamed later about a named related to only table (element) & the relations
  const { drawAll } = useDrawAll({ canvasRef, drawnElements, drawnRelations });

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    
    if (canvas) {
      canvas.width = size.width;
      canvas.height = size.height;
    }

    drawAll();
  }, [drawAll, canvasRef, size.width, size.height]);

  return <canvas ref={canvasRef} className={styles.canvasStyle} width={size.width} height={size.height} />;
};
