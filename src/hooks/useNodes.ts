import { useState, useCallback } from 'react';
import { Node, OnNodesChange, applyNodeChanges } from 'reactflow';

// initial Nodes and Style are temporary
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

const initialNodes = [
  { id: '1', type: 'tableNode', position: { x: 0, y: 0 }, positionAbsolute: { x: 0, y: 0 }, data: { title: "Users" }, style: basicStyleTableNode, expandParent: true, selected: false, draggable: true },
  { id: '2', type: 'fieldNode', position: { x: 0, y: 50 }, positionAbsolute: { x: 0, y: 50 }, data: { title: "Users.name", name: 'name', type: 'varchar(20)' }, parentNode: '1', draggable: false, selected: false },
  { id: '3', type: 'tableNode', position: { x: -400, y: 50 }, positionAbsolute: { x: 0, y: 0 }, data: { title: "UsersGroup" }, style: basicStyleTableNode, expandParent: true, selected: false, draggable: true },
  { id: '4', type: 'fieldNode', position: { x: 0, y: 50 }, positionAbsolute: { x: 0, y: 50 }, data: { title: "UsersGroup.name", name: 'name', type: 'varchar(20)' }, parentNode: '3', draggable: false, selected: false },
];

export const useNodes = () => {
  const [ nodes, setNodes ] = useState<Node<any>[]>(initialNodes);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  
  return { nodes, setNodes, onNodesChange }
}