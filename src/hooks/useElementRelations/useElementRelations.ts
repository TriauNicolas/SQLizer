import { useEffect, RefObject, useCallback } from 'react';
import { DrawnRelation } from '@/types/drawnRelations';

interface UseElementRelationsProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  drawnRelations: DrawnRelation[]
}

export const useElementRelations = ({ canvasRef, drawnRelations }: UseElementRelationsProps) => {

  const drawRelations = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;


  }, [canvasRef])

  useEffect(() => {
    drawRelations();
  }, [drawRelations]);

  return { drawRelations };
}