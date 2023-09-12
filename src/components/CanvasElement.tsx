import { useState, useCallback, useMemo } from 'react'
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

const initialNodes = [
  { id: '1', type: 'tableNode', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2', customProperty: "SaaS" } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const nodeTypes: NodeTypes = {
  tableNode: TableNode,
};

export const CanvasElement = () => {
  const [variant, setVariant] = useState<BackgroundVariant.Lines | BackgroundVariant.Dots | BackgroundVariant.Cross>(BackgroundVariant.Lines);
  // const nodeTypes = useMemo(() => ({ tableNode: TableNode }), []);
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

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
      <Background color="#ccc" variant={variant} />
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