'use client'

import { useState, useCallback, useRef } from 'react'
import ReactFlow, {
  addEdge,
  updateEdge,
  Panel,
  Controls,
  Background,
  applyNodeChanges,
  Node,
  Edge,
  OnNodesChange,
  OnConnect,
  BackgroundVariant,
  NodeTypes,
  useReactFlow,
  Connection
} from 'reactflow';
import 'reactflow/dist/style.css';
import styles from '../../styles/page.module.css'
import { TableNode } from '../TableNode/TableNode';
import { FieldNode } from '../FieldNode/FieldNode';
import { useDataToJson } from '@/hooks/useDataToJson';
import { ConvertedData } from '../../types/convertedData'

const initialNodes = [
  { id: 'Users', type: 'tableNode', position: { x: 0, y: 0 }, data: {}, expandParent: true },
  { id: 'Users.name', type: 'fieldNode', position: { x: 0, y: 50 }, data: { name: 'name', type: 'varchar(20)' }, parentNode: 'Users', draggable: false },
  { id: 'Group', type: 'tableNode', position: { x: -400, y: 50 }, data: {}, expandParent: true },
  { id: 'Group.name', type: 'fieldNode', position: { x: 0, y: 50 }, data: { name: 'name', type: 'varchar(20)' }, parentNode: 'Group', draggable: false },
];

const initialEdges = [{ id: 'Users.2-Group.3', source: '2', target: '3', animated: true }];

const nodeTypes: NodeTypes = {
  tableNode: TableNode,
  fieldNode: FieldNode
};

export const CanvasInstance = () => {
  const edgeUpdateSuccessful = useRef(true);
  const [ variant, setVariant ] = useState<BackgroundVariant.Lines | BackgroundVariant.Dots | BackgroundVariant.Cross>(BackgroundVariant.Cross);
  const [ nodes, setNodes ] = useState<Node[]>(initialNodes);
  const [ edges, setEdges ] = useState<Edge[]>(initialEdges);
  const { getNodes } = useReactFlow()
  const convertedData: ConvertedData | null= useDataToJson({ nodes, edges })

  // Basic functions doc ReactFlow
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge: Edge, newConnection: Connection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_: any, edge: Edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  // Test Function Add Table
  const addTable = () => {
    const tableToAdd = {id: 'New Table', type: 'tableNode', position: { x: 400, y: 0 }, data: {}, expandParent: true}
    setNodes([...nodes, tableToAdd])
  }

  // Test Getting nodes
  const nodesList: Node[] = getNodes()

  return (
    <div className={styles.canvasContainer}>
      <ReactFlow 
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgeUpdate={onEdgeUpdate}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
        >
      <Background color="#ccc" variant={variant} />
      <Controls />
        <Panel position="top-left">
          <div>Variants :</div>
          <button onClick={() => setVariant(BackgroundVariant.Dots)}>Dots</button>
          <button onClick={() => setVariant(BackgroundVariant.Lines)}>Lines</button>
          <button onClick={() => setVariant(BackgroundVariant.Cross)}>Cross</button>
          <button onClick={() => console.log(nodesList)}>Get Nodes</button>
          <button onClick={() => addTable()}>Add a Table</button>
          <button onClick={() => console.log(convertedData)}>Get converted Data</button>
        </Panel>
      </ReactFlow>
    </div>
  )
}