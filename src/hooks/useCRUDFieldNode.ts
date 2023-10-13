import { useReactFlow, Node } from 'reactflow';
import { addFieldSocket } from '../sockets/socketEmitter';
import { Field } from '@/types/tables';

export const useCRUDFieldNode = (setNodes: Function, setEdges: Function) => {
  const { getNodes, getEdges } = useReactFlow();

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
      
      // Update the nodes
      setNodes([...allNodes, newField]);

      // Update height parent
      if (parentTable.style) {
        parentTable.style.height = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--baseHeightTableNode").replace("px", "")) + 40;
      }
    }
  }

  const updateField = (tableName: string, fieldName: string, data: Field) => {
    const allNodes = getNodes();

    // Update the fieldNode
    setNodes(allNodes.map((node) => {
      if (node.data.title === `${tableName}.${fieldName}`) {
        return ({...node, data: data})
      }
      return ({...node})
    }));
  }

  const deleteField = (tableName: string, fieldName: string) => {
    const allNodes = getNodes();
    const fieldToDelete = allNodes.find((node) => node.data.name === fieldName);
    const newNodes = allNodes.filter((node) => node.data.name !== fieldName)

    // Manage the Y position of the fieldNode of the same table
    if (fieldToDelete) {
      setNodes((nodes: Node<any>[]) => nodes.map((node):any => {
        if (node.id != fieldToDelete.id && parseInt(node.id) > parseInt(fieldToDelete.id) && fieldToDelete?.parentNode === node.parentNode) {
          if (node.positionAbsolute) node.position.y -= 40;
        }
      }));
  
      // Delete node and related edges
      const newEdges = getEdges().filter((edge) => fieldToDelete?.id !== edge.source && fieldToDelete?.id !== edge.target);

      // Update nodes & edges
      setNodes(newNodes);
      setEdges(newEdges);
    }
  }

  return { addField, updateField, deleteField }
}
