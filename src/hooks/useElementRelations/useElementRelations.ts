import { useEffect, RefObject, useCallback } from 'react';
import { Relation } from '@/types/Relation';

interface UseElementRelationsProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  completedRelationsInfos: Relation[]
}

export const useElementRelations = ({ canvasRef, completedRelationsInfos }: UseElementRelationsProps) => {

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