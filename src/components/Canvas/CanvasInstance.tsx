'use client'

import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import ReactFlow, {
  addEdge,
  updateEdge,
  Panel,
  Controls,
  Background,
  Node,
  Edge,
  OnNodesChange,
  applyNodeChanges,
  OnEdgesChange,
  applyEdgeChanges,
  OnConnect,
  BackgroundVariant,
  NodeTypes,
  useReactFlow,
  Connection,
  SelectionMode
} from 'reactflow';
import 'reactflow/dist/style.css';
import styles from '../../styles/page.module.css'
import { TableNode } from '../TableNode/TableNode';
import { FieldNode } from '../FieldNode/FieldNode';
import { InfosTable } from '../InfosTable/InfosTable';
import { useDataToJson } from '@/hooks/useDataToJson';
import { useDownloadSql } from '@/hooks/useDownloadSql'
import { ConvertedData } from '../../types/tables'
import { InfosTableType } from '../../types/infosTable';
import { useApi } from '@/hooks/useApi';

const initialNodes = [
  { id: '1', type: 'tableNode', position: { x: 0, y: 0 }, positionAbsolute: { x: 0, y: 0 }, data: { title: "Users" }, expandParent: true, selected: false, draggable: true },
  { id: '2', type: 'fieldNode', position: { x: 0, y: 50 }, positionAbsolute: { x: 0, y: 50 }, data: { title: "Users.name", name: 'name', type: 'varchar(20)' }, parentNode: '1', draggable: false, selected: false },
  { id: '3', type: 'tableNode', position: { x: -400, y: 50 }, positionAbsolute: { x: 0, y: 0 }, data: { title: "UsersGroup" }, expandParent: true, selected: false, draggable: true },
  { id: '4', type: 'fieldNode', position: { x: 0, y: 50 }, positionAbsolute: { x: 0, y: 50 }, data: { title: "UsersGroup.name", name: 'name', type: 'varchar(20)' }, parentNode: '3', draggable: false, selected: false },
];

const initialEdges = [{ id: 'Users.2-UsersGroup.3', source: '2', target: '4', animated: true }];

const nodeTypes: NodeTypes = {
  tableNode: TableNode,
  fieldNode: FieldNode,
};

export const CanvasInstance = () => {
  const [ variant, setVariant ] = useState<BackgroundVariant.Lines | BackgroundVariant.Dots | BackgroundVariant.Cross>(BackgroundVariant.Cross);
  const [ nodes, setNodes ] = useState<Node[]>(initialNodes);
  const [ edges, setEdges ] = useState<Edge[]>(initialEdges);
  const { getNodes, getEdges } = useReactFlow();
  const edgeUpdateSuccessful = useRef(true);
  const convertedData: ConvertedData | null = useDataToJson({ nodes, edges });
  const { downloadSql } = useDownloadSql(convertedData);
  const [ tableInfos, setTableInfos ] = useState<InfosTableType>()
  const apiCall = useApi(convertedData);

  ///// Basic functions doc ReactFlow /////
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

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

  useEffect(() => {
    const tableParent = nodes.find((node) => node.selected === true && node.type != "fieldNode");
    let fieldsChildren: any = []
    if (tableParent) {
      fieldsChildren = getNodes().filter((node: Node) => node.parentNode === tableParent.id);

      setTableInfos({ 
        tableParent: { id: tableParent?.id, data: tableParent?.data }, 
        fieldsChildren: fieldsChildren
        });
    }

  }, [nodes, getNodes])

  // Test Function Add Table
  const addTable = () => {
    const numberOfNodes = getNodes().length + 1;
    const newNodes = [...getNodes(), {id: numberOfNodes.toString(), type: 'tableNode', position: { x: -50, y: 0 }, data: {}, expandParent: true}];
    setNodes(newNodes)
  }

  const panOnDrag = [1, 2];

  // Test Getting nodes
  const nodesList: Node[] = getNodes()

  return (
    <div className={styles.pagesContainer}>
      
      {/* TABLE INFOS ON CLICK */}
      <div className={styles.infosTableContainer}>
        <InfosTable infos={tableInfos} />
      </div>

      {/* CANVAS */}
      <div className={styles.canvasContainer}>
        <ReactFlow 
          nodes={nodes}
          nodeTypes={nodeTypes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onEdgeUpdate={onEdgeUpdate}
          onEdgeUpdateStart={onEdgeUpdateStart}
          onEdgeUpdateEnd={onEdgeUpdateEnd}
          onConnect={onConnect}
          fitView
          panOnScroll
          zoomOnDoubleClick={false}
          selectionOnDrag
          panOnDrag={panOnDrag}
          selectionMode={SelectionMode.Partial}
          >
        <Background color="#ccc" variant={variant} />
        <Controls />
          <Panel position="top-left">
            <div>Variants :</div>
            <button onClick={() => setVariant(BackgroundVariant.Dots)}>Dots</button>
            <button onClick={() => setVariant(BackgroundVariant.Lines)}>Lines</button>
            <button onClick={() => setVariant(BackgroundVariant.Cross)}>Cross</button>
            <button onClick={() => console.log(nodes)}>Get Nodes</button>
            <button onClick={() => console.log(edges)}>Get Edges</button>
            <button onClick={() => console.log(nodesList)}>Get nodesList</button>
            <button onClick={() => { if (JSON.stringify(nodesList) != JSON.stringify(nodes)) setNodes(nodesList); else console.log('Not Necessary') }}>Crush nodes by getNodes</button>
            <button onClick={() => addTable()}>Add a Table</button>
            <button onClick={() => console.log(convertedData)}>Get converted Data</button>
            <button onClick={downloadSql}>Download SQL</button>
            <button onClick={() => console.log(apiCall)}>API Call</button>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  )
}