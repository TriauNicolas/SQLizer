import { useLayoutEffect, useState, useEffect } from 'react';
import { usePosition } from '../../hooks/usePosition/usePosition';
import { useElement } from '../../hooks/useElement/useElement';
import { useElementRelations } from '../../hooks/useElementRelations/useElementRelations';
import { TableElement } from '@/types/TableElement';
import { Relation } from '@/types/Relation';
import styles from './CanvasElement.module.css';
import { useCanvasSize } from '@/hooks/useCanvasSize/useCanvasSize';

type CanvasElementProps = {
  drawnElements: TableElement[];
  drawnRelations: Relation[];
};

export const CanvasElement = ({ drawnElements, drawnRelations }: CanvasElementProps) => {
  const { canvasRef } = usePosition();
  const { size } = useCanvasSize()
  const { drawElement } = useElement({ canvasRef, drawnElements });
  const [ completedRelationsInfos, setCompletedRelationsInfos ] = useState<Relation[]>([]);
  const { drawRelations } = useElementRelations({ canvasRef, completedRelationsInfos });

  useEffect(() => {
    const completeInfosToPush: Relation[] = [];

    drawnRelations.forEach((relation: Relation) => {
      const relationToUpdate: Relation = {"from": {"table": relation.from.table, "field": relation.from.field}, "to": {"table": relation.to.table, "field": relation.to.field}};
      const positionsFrom = {"posX": 0, "posY": 0, "indexField": 0};
      const positionsTo = {"posX": 0, "posY": 0, "indexField": 0};

      const tableFrom = drawnElements.find((table) => table.name === relation.from.table);
      if (tableFrom) {
        positionsFrom.posX = tableFrom.posX;
        positionsFrom.posY = tableFrom.posY;
        positionsFrom.indexField = (tableFrom.fields).findIndex((field) => field.name === relation.from.field);
      } else {
        console.log("No 'Table From' found");
        return
      }

      const tableTo = drawnElements.find((table) => table.name === relation.to.table);
      if (tableTo) {
        positionsTo.posX = tableTo.posX;
        positionsTo.posY = tableTo.posY;
        positionsTo.indexField = (tableTo.fields).findIndex((field) => field.name === relation.from.field);
      } else {
        console.log("No 'Table To' found");
        return
      }
        
      relationToUpdate["positionsFrom"] = positionsFrom;
      relationToUpdate["positionsTo"] = positionsTo;

      completeInfosToPush.push(relationToUpdate);
    });

    setCompletedRelationsInfos(completeInfosToPush)
  }, [drawnElements, drawnRelations]);

  console.log(drawnRelations)

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    
    if (canvas) {
      canvas.width = size.width;
      canvas.height = size.height;
    }

    drawElement();
    drawRelations();
  }, [drawElement, drawRelations, canvasRef, size.width, size.height]);

  return <canvas ref={canvasRef} className={styles.canvasStyle} width={size.width} height={size.height} />;
};
