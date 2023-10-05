'use client';

import { useState, useEffect } from 'react';
import ReactFlow, {
  Panel,
  Controls,
  Background,
  BackgroundVariant,
  NodeTypes,
  useReactFlow,
  SelectionMode
} from 'reactflow';
import 'reactflow/dist/style.css';
import styles from '../../styles/page.module.css';
import { TableNode } from '../TableNode/TableNode';
import { FieldNode } from '../FieldNode/FieldNode';
import { InfosTable } from '../InfosTable/InfosTable';
import { useDataToJson } from '@/hooks/useDataToJson';
import { useDownloadSql } from '@/hooks/useDownloadSql'
import { ConvertedData } from '../../types/tables';
import { useApi } from '@/hooks/useApi';
import { useNodes } from '@/hooks/useNodes';
import { useAddTableNode } from '@/hooks/useAddTableNode';
import { useEdges } from '@/hooks/useEdges';
import { socket } from '../../sockets/socketConnection';
import { useSocketListeners } from '../../sockets/useSocketListener';

// Different nodes Types used for the canvas
const nodeTypes: NodeTypes = {
  tableNode: TableNode,
  fieldNode: FieldNode,
};

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

export const CanvasInstance = () => {
  const [ variant, setVariant ] = useState<BackgroundVariant.Lines | BackgroundVariant.Dots | BackgroundVariant.Cross>(BackgroundVariant.Cross);
  const { nodes, setNodes, onNodesChange } = useNodes();
  const { edges, onEdgeUpdateStart, onEdgesChange, onEdgeUpdate, onEdgeUpdateEnd, onConnect } = useEdges();
  const { sendSocketTable, getSocketTable } = useAddTableNode();
  const { getNodes } = useReactFlow();
  const convertedData: ConvertedData | null = useDataToJson({ nodes, edges });
  const { downloadSql } = useDownloadSql(convertedData);
  const { sqlData, isFetching, fetchSQL } = useApi();

  useEffect(() => {
    const handleResponseCreateTable = (data: any) => {
      console.log("Received responseCreateTable:", data.table);
      getSocketTable(data.table);
    };
    
    if (!socket) return;

    socket.on("responseCreateTable", (data) => handleResponseCreateTable(data));

    // Cleanup the listener when the component using the hook is unmounted
    return () => {
        socket.off("responseCreateTable", handleResponseCreateTable);
    };
}, [getSocketTable]);  // <-- Add this empty array

  return (
    <div className={styles.pagesContainer}>
      
      {/* TABLE INFOS ON CLICK */}
      <div className={styles.infosTableContainer}>
        <InfosTable currentNodes={nodes} />
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
          panOnDrag={[1, 2]}
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
            <button onClick={() => console.log(getNodes())}>Get nodesList</button>
            <button onClick={() => sendSocketTable()}>Add a Table</button>
            {/* <button onClick={() => setNodes([...getNodes(), { id: '100', type: 'tableNode', position: { x: 0, y: 0 }, data: { title: 'title100' }, style: basicStyleTableNode, expandParent: true }])}>Add a Table</button> */}
            <button onClick={() => console.log(convertedData)}>Get converted Data</button>
            <button onClick={downloadSql}>Download SQL</button>
            <button onClick={() => fetchSQL(convertedData)}>API Call</button>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  )
}