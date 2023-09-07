import { useEffect, useLayoutEffect, useState } from 'react';
import { usePosition } from '../../hooks/usePosition/usePosition';
import { useElement } from '../../hooks/useElement/useElement';
import { useElementRelations } from '../../hooks/useElementRelations/useElementRelations';
import { DrawnElement } from '@/types/drawnElements';
import { DrawnRelation } from '@/types/drawnRelations';
import styles from './CanvasElement.module.css';
import { useCanvasSize } from '@/hooks/useCanvasSize/useCanvasSize';

type CanvasElementProps = {
  drawnElements: DrawnElement[];
  drawnRelations: DrawnRelation[];
};

export const CanvasElement = ({ drawnElements, drawnRelations }: CanvasElementProps) => {
  const { canvasRef } = usePosition();
  const { drawElement } = useElement({ canvasRef, drawnElements });

  const completedRelationsInfos = drawnRelations

  const { drawRelations } = useElementRelations({ canvasRef, drawnRelations });
  const { size } = useCanvasSize()

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    
    if (canvas) {
      canvas.width = size.width;
      canvas.height = size.height;
    }

    drawElement();
    drawRelations()
  }, [drawElement, drawRelations, canvasRef, size.width, size.height]);

  return <canvas ref={canvasRef} className={styles.canvasStyle} width={size.width} height={size.height} />;
};
