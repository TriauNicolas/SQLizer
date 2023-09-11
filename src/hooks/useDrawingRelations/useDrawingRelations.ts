import { useEffect, RefObject, useCallback } from 'react';
import { Relation } from '@/types/Relation';

interface UseDrawingRelationsProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  fillRelations: Relation[]
}

export const useDrawingRelations = ({ canvasRef, fillRelations }: UseDrawingRelationsProps) => {

  const drawingRelations = useCallback(() => {
    console.log(`Filled Relations : ${fillRelations}`)
  }, [fillRelations])

  useEffect(() => {
    drawingRelations()
  }, [drawingRelations])

  return { drawingRelations }
}