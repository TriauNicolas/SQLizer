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
          "posX": 650,
          "posY": 50,
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
          "posX": 650,
          "posY": 450,
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
              "name": "JaaJ",
              "type": "integer",
            },
            {
              "name": "JaaJ",
              "type": "integer",
            },
            {
              "name": "JaaJ",
              "type": "integer",
            },
            {
              "name": "JaaJ",
              "type": "integer",
            },
            {
              "name": "JaaJ",
              "type": "integer",
            },
            {
              "name": "JaaJ",
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