'use client';

import { useEffect, useState } from 'react';
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
import stylesCanvas from './CanvasInstance.module.css';
import styles from '../../../styles/page.module.css';
import { TableNode } from '../TableNode/TableNode';
import { FieldNode } from '../FieldNode/FieldNode';
import { InfosTable } from '../InfosTable/InfosTable';
import { useDataToJson } from '@/hooks/CanvasSQLCall/useDataToJson';
import { useDownloadSql } from '@/hooks/CanvasSQLCall/useDownloadSql'
import { useNodes } from '@/hooks/CanvasNodesEdges/useNodes';
import { useCRUDTableNode } from '@/hooks/CanvasCRUD/useCRUDTableNode';
import { useEdges } from '@/hooks/CanvasNodesEdges/useEdges';
import { ResponseGetDatabaseEvent, ResponseCreateFieldEvent, ResponseCreateTableEvent, ResponseDeleteFieldEvent, ResponseDeleteTableEvent, ResponseMoveTableEvent, ResponseUpdateFieldEvent, ResponseUpdateTableNameEvent } from '@/types/socketEvent';
import { socket } from './CanvasElement';
import { useCRUDFieldNode } from '@/hooks/CanvasCRUD/useCRUDFieldNode';
import { useCRUDEdge } from '@/hooks/CanvasCRUD/useCRUDEdge';
import { Relation } from '@/types/tables';
import { useInitDatas } from '@/hooks/CanvasNodesEdges/useInitDatas';

// Different nodes Types used for the canvas
const nodeTypes: NodeTypes = {
  tableNode: TableNode,
  fieldNode: FieldNode,
};

export const CanvasInstance = () => {
  const [ variant, setVariant ] = useState<BackgroundVariant.Lines | BackgroundVariant.Dots | BackgroundVariant.Cross>(BackgroundVariant.Cross);
  const { nodes, setNodes, onNodesChange } = useNodes();
  const { edges, setEdges, onEdgeUpdateStart, onEdgesChange, onEdgeUpdate, onEdgeUpdateEnd, onConnect } = useEdges();
  const { initDatasCanvas } = useInitDatas(setNodes, setEdges);
  const { sendSocketTable, addTable, deleteTable, updateTableName, moveTable } = useCRUDTableNode(setNodes, setEdges);
  const { addField, updateField, deleteField } = useCRUDFieldNode(setNodes, setEdges);
  const { addEdge, deleteEdge } = useCRUDEdge(setNodes, setEdges);
  const { getNodes } = useReactFlow();
  const { convertionData } = useDataToJson();
  const { triggerSqlFetch } = useDownloadSql();

  useEffect(() => {
    // Wait the initialization of the socket
    if (!socket) return;

    // Get datas from the database
    socket.on('responseGetDatabase', (data: ResponseGetDatabaseEvent) => initDatasCanvas(data.tables, data.relations));
    
    // Tables
    socket.on('responseCreateTable', (data: ResponseCreateTableEvent) => addTable(data.table));
    socket.on('responseUpdateTableName', (data: ResponseUpdateTableNameEvent) => updateTableName(data.tableName, data.newTableName));
    socket.on('responseDeleteTable', (data: ResponseDeleteTableEvent) => deleteTable(data.tableName));
    socket.on('responseMoveTable', (data: ResponseMoveTableEvent) => moveTable(data.tableName, data.posX, data.posY));
    
    // Fields
    socket.on('responseCreateField', (data: ResponseCreateFieldEvent) => addField(data.field, data.tableName));
    socket.on('responseUpdateField', (data: ResponseUpdateFieldEvent) => updateField(data.tableName, data.fieldName, data.field));
    socket.on('responseDeleteField', (data: ResponseDeleteFieldEvent) => deleteField(data.tableName, data.fieldName));
    
    // Edges
    socket.on('responseCreateEdge', (relation: Relation) => addEdge(relation));
    socket.on('responseDeleteEdge', (relation: Relation) => deleteEdge(relation));

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
          <Panel position="top-left" className={stylesCanvas.panel_nav_bar}>
            <div className={stylesCanvas.panel_main}>
              <div className={stylesCanvas.panel_Vertical_Menu}>
                <span className={stylesCanvas.panel_button}>Grid Style</span>
                <div className={stylesCanvas.panel_Vertical_Menu_Content}>
                  <button onClick={() => setVariant(BackgroundVariant.Dots)} className={stylesCanvas.panel_button}>Dots</button>
                  <button onClick={() => setVariant(BackgroundVariant.Lines)} className={stylesCanvas.panel_button}>Lines</button>
                  <button onClick={() => setVariant(BackgroundVariant.Cross)} className={stylesCanvas.panel_button}>Cross</button>
                </div>
              </div>
              <div className={stylesCanvas.panel_Vertical_Menu}>
                <span className={stylesCanvas.panel_button}>Get Element</span>
                <div className={stylesCanvas.panel_Vertical_Menu_Content}>
                  <button onClick={() => console.log(nodes)} className={stylesCanvas.panel_button}>Nodes</button>
                  <button onClick={() => console.log(edges)} className={stylesCanvas.panel_button}>Edges</button>
                  <button onClick={() => console.log(getNodes())} className={stylesCanvas.panel_button}>NodesList</button>
                  <button onClick={() => handleTriggerDataToJson()} className={stylesCanvas.panel_button}>Converted Data</button>
                </div>
              </div>
              <button onClick={() => sendSocketTable()} className={stylesCanvas.panel_button}>Add a Table</button>
              <button onClick={() => triggerSqlFetch(handleTriggerDataToJson())} className={stylesCanvas.panel_button}>Download SQL</button>
              </div>
            </Panel>
        </ReactFlow>
      </div>
    </div>
  )
}