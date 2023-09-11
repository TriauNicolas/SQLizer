import { useEffect, useState } from 'react';
import { TableElement } from '@/types/TableElement';
import { Relation } from '@/types/Relation';

interface UseFillRelationsProps {
  drawnElements: TableElement[];
  drawnRelations: Relation[]
}

export const useFillRelations = ({ drawnElements, drawnRelations }: UseFillRelationsProps) => {
  const [ completedRelationsInfos, setCompletedRelationsInfos ] = useState<Relation[]>([]);

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

  return completedRelationsInfos
}