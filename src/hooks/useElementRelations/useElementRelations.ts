import { useEffect, RefObject, useCallback } from 'react';
import { useFillRelations } from '../useFillRelations/useFillRelations';
import { useDrawingRelations } from '../useDrawingRelations/useDrawingRelations';
import { TableElement } from '@/types/TableElement';
import { Relation } from '@/types/Relation';

interface UseElementRelationsProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  drawnElements: TableElement[];
  drawnRelations: Relation[]
}

export const useElementRelations = ({ canvasRef, drawnElements, drawnRelations }: UseElementRelationsProps) => {
  const fillRelations:Relation[] = useFillRelations({drawnElements, drawnRelations});
  const { drawingRelations } = useDrawingRelations({canvasRef, fillRelations})

  const drawRelations = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    drawingRelations();
  }, [canvasRef, drawingRelations])

  useEffect(() => {
    drawRelations();
  }, [drawRelations]);

  return { drawRelations };
}