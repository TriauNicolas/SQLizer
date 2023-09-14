import { useCallback, useEffect, useMemo, useState } from 'react'
import { Node, Edge } from 'reactflow';
import { ConvertedData, Table } from '@/types/convertedData';
import { useReactFlow } from 'reactflow'

type DataToJsonProps = {
  nodes: Node[];
  edges: Edge[];
}

export const useDataToJson = ({ nodes, edges }: DataToJsonProps) => {
  const [ dataJSON, setDataJSON ] = useState<ConvertedData | null>(null);

  useEffect(() => {
    const objectJSON: ConvertedData = {"dbName": 'MyFirstDB', 'tables': [], 'relations': []}

    const tables = nodes.filter((node: Node): boolean => node.expandParent == true)

    tables.forEach((table: Node) => {
      const objectTable: Table = { 
        "name": table.id, 
        posX: table.position.x, 
        posY: table.position.y, 
        fields: []
      }
      
      const fieldsTable = nodes.filter((node: Node) => table.id == node.parentNode)
      fieldsTable.forEach((node: Node) => {
        const objectField = {
          "title": node.data.title,
          "name": node.data.name, 
          "type": node.data.type, 
          "autoIncrement": node.data.autoIncrement ? node.data.autoIncrement: false,
          "pk": node.data.pk ? node.data.pk : false,
          "nullable": node.data.nullable ? node.data.nullable: false
        }

        objectTable.fields.push(objectField)
      })

      objectJSON.tables.push(objectTable)
    })

    setDataJSON(objectJSON)
  }, [nodes])

  return dataJSON
}