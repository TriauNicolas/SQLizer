'use client'

import { useState } from 'react';
import Layout from './layout'
import styles from '../styles/page.module.css';
import { CanvasElement } from '../components/CanvasElemment/CanvasElement';
import { PredefinedTable } from '../components/PredefinedTable';
import { DrawnElement } from '@/types/drawnElements';

export default function Home() {
  const [ drawnElements, setDrawnElements ] = useState<DrawnElement[]>([])

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
          "posX": 1000,
          "posY": 200,
          "fields": [
            {
              "name": "id",
              "type": "uuid",
              "primaryKey": true
            },
            {
              "name": "SooS",
              "type": "varchar(20)"
            },
            {
              "name": "name",
              "type": "varchar(20)"
            },
          ]
        },
        {
          "type": 'custom',
          "name": 'Second Table',
          "posX": 1300,
          "posY": 200,
          "fields": [
            {
              "name": "name",
              "type": "varchar(20)",
            },
            {
              "name": "SooS",
              "type": "varchar(20)",
            },
            {
              "name": "JaaJ",
              "type": "integer",
            },
            {
              "name": "JooJ",
              "type": "integer",
            },
            {
              "name": "SaaS",
              "type": "integer",
            },
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
  
  return (
    <Layout>
      <div className={styles.mainDiv}>
        <div className={styles.containerCanvas}>
          <PredefinedTable callbackSelection={handlerForCallbackSelection} />
          {drawnElements ? <CanvasElement drawnElements={drawnElements} />: ''}
        </div>
      </div>
    </Layout>
  );
}