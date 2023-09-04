import React from 'react';
import '../styles/globals.css';
import styles from '../styles/page.module.css';
import { CanvasElement } from '../components/CanvasElemment/CanvasElement';
import { PredefinedTable } from '../components//PredefinedTable';

export default function Home() {
  const [elementToDraw, setElementToDraw] = React.useState('');

  const handlerForCallbackSelection = (selectedElement: string) => {
    setElementToDraw(selectedElement);
  };

  return (
    <div className={styles.mainDiv}>
      <h1>Canvas Test</h1>
      <div className={styles.containerCanvas}>
        <PredefinedTable callbackSelection={handlerForCallbackSelection} />
        <CanvasElement elementToDraw={elementToDraw} />
      </div>
    </div>
  );
}
