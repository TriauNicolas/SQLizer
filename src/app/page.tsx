'use client'

import { useState } from 'react'
import Layout from './layout'
import ReactFlow, { Background, Panel, Controls, BackgroundVariant } from 'reactflow';
import 'reactflow/dist/style.css';
import styles from '../styles/page.module.css'


const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function Home() {
  const [variant, setVariant] = useState<BackgroundVariant.Lines | BackgroundVariant.Dots | BackgroundVariant.Cross>(BackgroundVariant.Lines);

  return (
    <Layout>
      <div className={styles.canvasContainer}>
        <ReactFlow defaultNodes={initialNodes} defaultEdges={initialEdges} fitView>
          <Background color="#ccc" variant={variant} />
          <Controls />
            <Panel position="top-left">
              <div>Variants :</div>
              <button onClick={() => setVariant(BackgroundVariant.Dots)}>dots</button>
              <button onClick={() => setVariant(BackgroundVariant.Lines)}>lines</button>
              <button onClick={() => setVariant(BackgroundVariant.Cross)}>cross</button>
            </Panel>
        </ReactFlow>
      </div>
    </Layout>
  )
}
