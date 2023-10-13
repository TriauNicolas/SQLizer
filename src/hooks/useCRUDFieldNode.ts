import { useReactFlow, Node } from 'reactflow';
import { addFieldSocket } from '../sockets/socketEmitter';
import { Field, Table } from '@/types/tables';

export const useCRUDFieldNode = (setNodes: Function, setEdges: Function) => {
  const { getNodes, getEdges } = useReactFlow();

  const sendSocketField = (field: Field, tableName: string) => {
    addFieldSocket(field, tableName);
  }

  const addField = (field: Field, tableName: string) => {
    const allNodes = getNodes();
    const parentTable = allNodes.find((node) => node.data.title === tableName);
    if (parentTable) {
      const numberFieldsInParent = allNodes.filter((node) => node.parentNode === parentTable.id).length;
      const offsetY = 50 + (40 * numberFieldsInParent);
  
      // Prepare node object
      const newField = { 
        id: (allNodes.length + 1).toString(),
        type: "fieldNode", 
        position: { x: 0, y: offsetY },
        data: field,
        parentNode: parentTable.id,
        draggable: false,
        selected: false,
        hidden: false
      }

      // // Update the nodes
      setNodes([...allNodes, newField]);

      // Update height parent
      if (parentTable.style) {
        parentTable.style.height = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--baseHeightTableNode").replace("px", "")) + 40;
      }
    }
  }

  return { sendSocketField, addField }
}
