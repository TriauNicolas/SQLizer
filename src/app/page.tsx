'use client'

import { useState } from 'react';
// import '../styles/globals.css';
import Layout from './layout'
import styles from '../styles/page.module.css';
import { CanvasElement } from '../components/CanvasElemment/CanvasElement';
import { PredefinedTable } from '../components/PredefinedTable';
import { DrawnElement } from '@/types/drawnElements';

export default function Home() {
  const [ drawnElements, setDrawnElements ] = useState<DrawnElement[]>()

  // const relations = [{ 
  //   "from": "users",
  //   "to": "groups",
  //   "field": "id",
  //   "type": "one-to-many"
  // }]

  const handlerForCallbackSelection = (selectedElement: string) => {
    if (selectedElement == "all") {
      setDrawnElements([
        {
          "type": 'custom',
          "name": 'First Table',
          "posX": -150,
          "posY": -200,
          "fields": [
            {
              "name": "id",
              "type": "uuid",
              "primaryKey": true
            }
          ]
        },
        {
          "type": 'custom',
          "name": 'Second Table',
          "posX": 150,
          "posY": 200,
          "fields": [
            {
              "name": "name",
              "type": "varchar(20)",
            }
          ]
        },
      ])
    } 
    else {
      setDrawnElements([
        {
          "type": 'blank',
          "name": '',
          "posX": 0,
          "posY": 0,
          "fields": [
            {
              "name": '',
              "type": '',
              "primaryKey": false
            }
          ]
        }]);
    }
  };

  console.log(drawnElements);
  
  return (
    <Layout>
      <div className={styles.mainDiv}>
        <div className={styles.containerCanvas}>
          <PredefinedTable callbackSelection={handlerForCallbackSelection} />
          <CanvasElement drawElements={drawnElements} />
        </div>
      </div>
    </Layout>
  );
}