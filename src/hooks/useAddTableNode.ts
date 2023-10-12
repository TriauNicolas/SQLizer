import { useReactFlow, Node } from 'reactflow';
import { addTableSocket } from '../sockets/socketEmitter';
import { Table } from '@/types/tables';
import { useNodes } from '@/hooks/useNodes';

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

export const useAddTableNode = (setNodes: Function) => {
  const { getNodes } = useReactFlow();

  // Add Table from Canvas
  const sendSocketTable = () => {
    // const numberOfNodes = getNodes().length + 1;
    const numberOfNodes = new Date;
    const tableSocket = { name: `NewTable${numberOfNodes}`, posX: 0, posY: 0, fields: [] };

    // Emit the socket
    addTableSocket(tableSocket);
  }

  // Add Table from socket
  const getSocketTable = (table: Table) => {
    console.log(table)
    const getIdFromName = (table.name)?.replace('NewTable', '');
    const newTableNode: Node<any> = { id: getIdFromName, type: 'tableNode', position: { x: table.posX, y: table.posY }, data: { title: table.name }, style: basicStyleTableNode, expandParent: true };

    // Add it to the canvas
    const newNodes = [...getNodes(), newTableNode];
    setNodes(newNodes);
  }

  return { sendSocketTable, getSocketTable }
};