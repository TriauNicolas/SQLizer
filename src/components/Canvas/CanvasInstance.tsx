'use client';

import { useEffect, useMemo, useState } from 'react';
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
import { useCRUDTableNode } from '@/hooks/useCRUDTableNode';
import { useEdges } from '@/hooks/useEdges';
import { ResponseCreateEdgeEvent, ResponseCreateFieldEvent, ResponseCreateTableEvent, ResponseDeleteEdgeEvent, ResponseDeleteFieldEvent, ResponseDeleteTableEvent, ResponseMoveTableEvent, ResponseUpdateFieldEvent, ResponseUpdateTableNameEvent } from '@/types/socketEvent';
import { socket } from './CanvasElement';
import { useCRUDFieldNode } from '@/hooks/useCRUDFieldNode';

// Different nodes Types used for the canvas
const nodeTypes: NodeTypes = {
  tableNode: TableNode,
  fieldNode: FieldNode,
};

export const CanvasInstance = () => {
  const [ variant, setVariant ] = useState<BackgroundVariant.Lines | BackgroundVariant.Dots | BackgroundVariant.Cross>(BackgroundVariant.Cross);
  const { nodes, setNodes, onNodesChange } = useNodes();
  const { edges, setEdges, onEdgeUpdateStart, onEdgesChange, onEdgeUpdate, onEdgeUpdateEnd, onConnect } = useEdges();
  const { sendSocketTable, addTable, deleteTable, updateTableName, moveTable } = useCRUDTableNode(setNodes, setEdges);
  const { addField, updateField } = useCRUDFieldNode(setNodes, setEdges);
  const { getNodes } = useReactFlow();
  const { convertionData } = useDataToJson();
  const { triggerSqlFetch } = useDownloadSql();

  useEffect(() => {
    // Wait the initialization of the socket
    if (!socket) return;
    
    // Tables
    socket.on('responseCreateTable', (data: ResponseCreateTableEvent) => addTable(data.table));
    socket.on('responseUpdateTableName', (data: ResponseUpdateTableNameEvent) => updateTableName(data.tableName, data.newTableName));
    socket.on('responseDeleteTable', (data: ResponseDeleteTableEvent) => deleteTable(data.tableName));
    socket.on('responseMoveTable', (data: ResponseMoveTableEvent) => moveTable(data.tableName, data.posX, data.posY));
    
    // Fields
    socket.on('responseCreateField', (data: ResponseCreateFieldEvent) => addField(data.field, data.tableName));
    socket.on('responseUpdateField', (data: ResponseUpdateFieldEvent) => updateField(data.tableName, data.fieldName, data.field));
    socket.on('responseDeleteField', (data: ResponseDeleteFieldEvent) => console.log(data));
    
    // Edges
    // socket.on('requestCreateEdge', (data: ResponseCreateEdgeEvent) => console.log(data));
    // socket.on('requestDeleteEdge', (data: ResponseDeleteEdgeEvent) => console.log(data));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const handleTriggerDataToJson = () => {
    const data = convertionData({ nodes, edges });
    return data
  }

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
            <button onClick={() => handleTriggerDataToJson()}>Get converted Data</button>
            <button onClick={() => triggerSqlFetch(handleTriggerDataToJson())}>Download SQL</button>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  )
}
