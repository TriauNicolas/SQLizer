import { useCallback, useEffect, useState } from 'react'
import { Node, Edge } from 'reactflow';
import { ConvertedData, Table } from '@/types/convertedData';

type DataToJsonProps = {
  nodes: Node[];
  edges: Edge[];
}

export const useDataToJson = ({ nodes, edges }: DataToJsonProps) => {
  const [ dataJSON, setDataJSON ] = useState<ConvertedData | null>(null)

  useEffect(() => {
    const objectJSON: ConvertedData = {"dbName": '', 'tables': []}

    const tables = nodes.filter((node): boolean => node.expandParent == true)

    tables.forEach((table: Node) => {
      const objectTable: Table = { 
        "name": table.id, 
        posX: table.position.x, 
        posY: table.position.y, 
        fields: []
      }
      
      const fieldsTable = nodes.filter((node: Node) => table.id == node.parentNode)
      fieldsTable.forEach((node) => {
        const objectField = {
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
  }, [nodes, edges])

  return dataJSON
}