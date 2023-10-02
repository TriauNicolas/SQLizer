import { useCallback } from 'react';
import { useReactFlow, Node } from 'reactflow';
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

export const useAddTableNode = () => {
  const { getNodes } = useReactFlow();
  // const { nodes, setNodes } = useNodes();

  // Add Table
  const addTable = useCallback(() => {
    const numberOfNodes = getNodes().length + 1;
    const newTableNode: Node<any> = {id: numberOfNodes.toString(), type: 'tableNode', position: { x: -50, y: 0 }, data: { title: `NewTable${numberOfNodes}` }, style: basicStyleTableNode, expandParent: true};
    // const newNodes = [...getNodes(), newTableNode];
    // setNodes(newNodes);

    // const tableSocket = { name: newTableNode.data.title, posX: newTableNode.position.x, posY: newTableNode.position.y, fields: [] }

    // Returning the table, later will emit a socket
    return newTableNode
  }, [getNodes])

  return { addTable }
};