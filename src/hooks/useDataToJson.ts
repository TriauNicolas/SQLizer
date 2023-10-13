import { useCallback, useEffect, useMemo, useState } from 'react'
import { Node, Edge } from 'reactflow';
import { ConvertedData, Table } from '@/types/tables';

type ConvertionDataProps = {
  nodes: Node[];
  edges: Edge[];
}

export const useDataToJson = () => {

  const convertionData = ({ nodes, edges }: ConvertionDataProps) => {
    const objectJSON: ConvertedData = {"dbName": 'MyFirstDB', 'tables': [], 'relations': []};

    const tables = nodes.filter((node: Node): boolean => node.expandParent == true);

    tables.forEach((table: Node) => {
      const objectTable: Table = { 
        name: table.data.title, 
        posX: table.position.x, 
        posY: table.position.y, 
        fields: []
      }
      
      const fieldsTable = nodes.filter((node: Node) => table.id == node.parentNode)
      fieldsTable.forEach((node: Node) => {
        console.log(node);
        const objectField = {
          title: node.data.title,
          name: node.data.name, 
          type: node.data.type, 
          default: node.data.default,
          autoIncrement: node.data.autoIncrement ? node.data.autoIncrement: false,
          pk: node.data.pk ? node.data.pk : false,
          nullable: node.data.nullable ? node.data.nullable: false
        }

        objectTable.fields.push(objectField);
      })

      objectJSON.tables.push(objectTable);
    })

    return objectJSON
  }

  return { convertionData }
}