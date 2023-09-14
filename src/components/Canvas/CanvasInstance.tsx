'use client'

import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
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
import { useDownloadSql } from '@/hooks/useDownloadSql'
import { ConvertedData } from '../../types/convertedData'
import { useApi } from '@/hooks/useApi';

const initialNodes = [
  { id: '1', type: 'tableNode', position: { x: 0, y: 0 }, positionAbsolute: { x: 0, y: 0 }, data: { title: "Users" }, expandParent: true },
  { id: '2', type: 'fieldNode', position: { x: 0, y: 50 }, positionAbsolute: { x: 0, y: 50 }, data: { title: "Users.name", name: 'name', type: 'varchar(20)' }, parentNode: '1', draggable: false },
  { id: '3', type: 'tableNode', position: { x: -400, y: 50 }, positionAbsolute: { x: -400, y: 50 }, data: { title: "UsersGroup" }, expandParent: true },
  { id: '4', type: 'fieldNode', position: { x: 0, y: 50 }, positionAbsolute: { x: 0, y: 50 }, data: { title: "UsersGroup.name", name: 'name', type: 'varchar(20)' }, parentNode: '3', draggable: false },
];

const initialEdges = [{ id: 'Users.2-UsersGroup.3', source: '2', target: '4', animated: true }];

const nodeTypes: NodeTypes = {
  tableNode: TableNode,
  fieldNode: FieldNode
};

export const CanvasInstance = () => {
  const edgeUpdateSuccessful = useRef(true);
  const [ variant, setVariant ] = useState<BackgroundVariant.Lines | BackgroundVariant.Dots | BackgroundVariant.Cross>(BackgroundVariant.Cross);
  const [ canvasNodes, setCanvasNodes ] = useState<Node[]>(initialNodes);
  const [ canvasEdges, setCanvasEdges ] = useState<Edge[]>(initialEdges);
  const { getNodes, getEdges } = useReactFlow();
  const convertedData: ConvertedData | null = useDataToJson({ canvasNodes, canvasEdges });
  const { downloadSql } = useDownloadSql(convertedData);
  // const apiCall = useApi(convertedData);

  // Basic functions doc ReactFlow
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setCanvasNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge: Edge, newConnection: Connection) => {
    edgeUpdateSuccessful.current = true;
    setCanvasEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_: any, edge: Edge) => {
    if (!edgeUpdateSuccessful.current) {
      setCanvasEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const onConnect: OnConnect = useCallback(
    (connection) => setCanvasEdges((eds) => addEdge(connection, eds)),
    [setCanvasEdges]
  );

  // Test Function Add Table
  const addTable = () => {
    const tableToAdd = {id: 'New Table', type: 'tableNode', position: { x: 400, y: 0 }, data: {}, expandParent: true}
    setCanvasNodes([...canvasNodes, tableToAdd])
  }

  // Test Getting nodes
  const nodesList: Node[] = getNodes()

  return (
    <div className={styles.canvasContainer}>
      <ReactFlow 
        nodes={canvasNodes}
        edges={canvasEdges}
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
          <button onClick={() => console.log(canvasNodes)}>Get Nodes</button>
          <button onClick={() => console.log(nodesList)}>Get nodesList</button>
          <button onClick={() => { if (JSON.stringify(nodesList) != JSON.stringify(canvasNodes)) setCanvasNodes(nodesList); else console.log('Not Necessary') }}>Crush nodes by getNodes</button>
          <button onClick={() => addTable()}>Add a Table</button>
          <button onClick={() => console.log(convertedData)}>Get converted Data</button>
          <button onClick={downloadSql}>Download SQL</button>
          {/* <button onClick={() => console.log(apiCall)}>API Call</button> */}
        </Panel>
      </ReactFlow>
    </div>
  )
}