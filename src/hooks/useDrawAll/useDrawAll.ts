import { RefObject, useCallback } from 'react';
import { useElement } from '../../hooks/useElement/useElement';
import { useElementRelations } from '../../hooks/useElementRelations/useElementRelations';
import { TableElement } from '@/types/TableElement';
import { Relation } from '@/types/Relation';

type UseDrawAllProps = {
  canvasRef: RefObject<HTMLCanvasElement>;
  drawnElements: TableElement[];
  drawnRelations: Relation[];
};

export const useDrawAll = ({ canvasRef, drawnElements, drawnRelations }: UseDrawAllProps) => {
  const { drawElement } = useElement({ canvasRef, drawnElements });
  const { drawRelations } = useElementRelations({ canvasRef, drawnElements, drawnRelations });

  const drawAll = useCallback(() => {
    drawElement();
    drawRelations();
  }, [drawElement, drawRelations]);

  return { drawAll };
}