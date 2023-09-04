'use client'

import React, { useEffect } from 'react';
// import '../styles/globals.css';
import Layout from './layout'
import styles from '../styles/page.module.css';
import { CanvasElement } from '../components/CanvasElemment/CanvasElement';
import { PredefinedTable } from '../components/PredefinedTable';

export default function Home() {
  const [elementToDraw, setElementToDraw] = React.useState('');

  const handlerForCallbackSelection = (selectedElement: string) => {
    setElementToDraw(selectedElement);
  };

  

  return (
    <Layout>
      <div className={styles.mainDiv}>
        <div className={styles.containerCanvas}>
          <PredefinedTable callbackSelection={handlerForCallbackSelection} />
          <CanvasElement elementToDraw={elementToDraw} />
        </div>
      </div>
    </Layout>
  );
}
