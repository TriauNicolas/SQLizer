import { useReactFlow, Node } from 'reactflow';
import { addTableSocket } from '../sockets/socketEmitter';
import { Table } from '@/types/tables';

// CSS Table
const basicStyleTableNode: {} = {
  width: "var(--baseWidthTableNode)",
  minHeight: "var(--baseHeightTableNode)",
  backgroundColor: "#fff",
  border: "1.5px solid var(--borderColorTableNode)",
  borderRadius: "2px",
  display: "flex",
  flexDirection: "column",
  alignItems: "top",
  justifyContent: "flex-start",
  color: "#000",
}

export const useCRUDTableNode = (setNodes: Function, setEdges: Function) => {
  const { getNodes, getEdges, deleteElements } = useReactFlow();

  // Send infos from canvas to socket
  const sendSocketTable = () => {
    // const numberOfNodes = getNodes().length + 1;
    const numberOfNodes = new Date;
    const tableSocket = { name: `NewTable${numberOfNodes}`, posX: 0, posY: 0, fields: [] };

    // Emit the socket
    addTableSocket(tableSocket);
  }

  // Add Table from socket
  const addTable = (table: Table) => {
    const getIdFromName = (table.name)?.replace('NewTable', '');
    const newTableNode: Node<any> = { id: getIdFromName, type: 'tableNode', position: { x: table.posX, y: table.posY }, data: { title: table.name }, style: basicStyleTableNode, expandParent: true };

    // Add it to the canvas
    const newNodes = [...getNodes(), newTableNode];
    setNodes(newNodes);
  }

  // Delete Table from socket
  const deleteTable = (tableID: string) => {
    // Remove the tableNode and the fieldNode related to the table
    const nodesFiltered = getNodes().filter((node) => node.data.title != tableID && node.parentNode != tableID);

    // Remove the edges related
    const allNodesRelatedToTable = getNodes().filter((node) => node.data.title != tableID && node.parentNode != tableID);
    const allIds = allNodesRelatedToTable.map((node) => node.id);
    const edgesFiltered = getEdges().filter((edge) => allIds.includes(edge.source) && allIds.includes(edge.target));
    
    // Remove from the canvas
    setNodes(nodesFiltered);
    setEdges(edgesFiltered);
  }

  const updateTableName = (tableName: string, newTableName: string) => {
    const allNodes = getNodes();
    const changedNodes = allNodes.map((node) => {
      if (node.data.title === tableName) {
        return ({...node, data: { title: newTableName } })
      }
      return ({...node})
    })

    console.log(changedNodes)
    setNodes(changedNodes);
  }

  return { sendSocketTable, addTable, deleteTable, updateTableName }
};
