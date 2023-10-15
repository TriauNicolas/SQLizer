import { useState, useCallback } from 'react';
import { Node, OnNodesChange, applyNodeChanges } from 'reactflow';

export const useNodes = () => {
  const [ nodes, setNodes ] = useState<Node<any>[]>([]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  
  return { nodes, setNodes, onNodesChange }
}