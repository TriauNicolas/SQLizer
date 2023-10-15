import { Node, Edge, useReactFlow } from 'reactflow';
import { Field, Relation, Table } from "@/types/tables";
import { basicStyleTableNode } from '../CanvasCRUD/useCRUDTableNode';

export const useInitDatas = (setNodes: Function, setEdges: Function) => {
  const initDatasCanvas = (tables: Table[], relations: Relation[]) => {
      // Nodes
      const initialNodes: Node<any>[] = [];
      tables.forEach((table: Table) => {
        const newTableNode: Node<any> = { id: (initialNodes.length + 1).toString(), type: 'tableNode', position: { x: table.posX, y: table.posY }, data: { title: table.name }, style: basicStyleTableNode, expandParent: true };
  
        initialNodes.push(newTableNode);
  
        table.fields.forEach((field: Field) => {
          const numberFieldsInParent = initialNodes.filter((node) => node.parentNode === newTableNode.id).length;
          const offsetY = 50 + (40 * numberFieldsInParent);
  
          const newField = {
            id: (initialNodes.length + 1).toString(),
            type: "fieldNode", 
            position: { x: 0, y: offsetY },
            data: field,
            parentNode: newTableNode.id,
            draggable: false,
            selected: false,
            hidden: false
          }
  
          initialNodes.push(newField);
          // Update height parent
          if (newTableNode.style) {
            newTableNode.style.height = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--baseHeightTableNode").replace("px", "")) + 40;
          }
        })
      })
  
      setNodes(initialNodes);
      
      // Edges
      const initialEdges: Edge[] = [];
      relations.forEach((relation: Relation) => {
        const nodeFrom = initialNodes.find((node) => node.data.title === `${relation.from.table}.${relation.from.field}`);
        const nodeTo = initialNodes.find((node) => node.data.title === `${relation.to.table}.${relation.to.field}`);
  
        if (nodeFrom && nodeTo) {
          const newEdge = { id: `reactflow_edge-${nodeFrom.id}-${nodeTo.id}`, source: nodeFrom.id, sourceHandle: null, target: nodeTo.id, targetHandle: null }
          
          initialEdges.push(newEdge);
        }
      })
  
      setEdges(initialEdges);
    }

    return { initDatasCanvas }
}
