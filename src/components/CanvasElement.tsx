import { useState, useCallback } from 'react'
import ReactFlow, {
  addEdge,
  Panel,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  BackgroundVariant,
  NodeTypes
} from 'reactflow';
import 'reactflow/dist/style.css';
import styles from '../styles/page.module.css'
import { TableNode } from './TableNode/TableNode';
import { FieldNode } from './FieldNode/FieldNode';

const initialNodes = [
  { id: 'Users', type: 'tableNode', position: { x: 0, y: 0 }, data: { label: 'Users' }, expandParent: true },
  { id: '2', type: 'fieldNode', position: { x: 0, y: 50 }, data: { label: '2' }, parentNode: 'Users', draggable: false },
  { id: 'Group', type: 'tableNode', position: { x: -400, y: 50 }, data: { label: 'Group' }, expandParent: true },
  { id: '3', type: 'fieldNode', position: { x: 0, y: 50 }, data: { label: '3' }, parentNode: 'Group', draggable: false },
];

const initialEdges = [{ id: 'Users.2-Group.3', source: '2', target: '3', animated: true }];

const nodeTypes: NodeTypes = {
  tableNode: TableNode,
  fieldNode: FieldNode
};

export const CanvasElement = () => {
  const [ variant, setVariant ] = useState<BackgroundVariant.Lines | BackgroundVariant.Dots | BackgroundVariant.Cross>(BackgroundVariant.Lines);
  const [ nodes, setNodes ] = useState<Node[]>(initialNodes);
  const [ edges, setEdges ] = useState<Edge[]>(initialEdges);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div className={styles.canvasContainer}>
      <ReactFlow 
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
        >
      <Background color="#ccc" variant={variant} gap={12} size={1}/>
      <Controls />
        <Panel position="top-left">
          <div>Variants :</div>
          <button onClick={() => setVariant(BackgroundVariant.Dots)}>Dots</button>
          <button onClick={() => setVariant(BackgroundVariant.Lines)}>Lines</button>
          <button onClick={() => setVariant(BackgroundVariant.Cross)}>ross</button>
        </Panel>
      </ReactFlow>
    </div>
  )
}