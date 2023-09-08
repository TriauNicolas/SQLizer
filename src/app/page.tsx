'use client'

import { use, useState } from 'react';
import Layout from './layout'
import styles from '../styles/page.module.css';
import { CanvasElement } from '../components/CanvasElemment/CanvasElement';
import { PredefinedTable } from '../components/PredefinedTable';
import { TableElement } from '@/types/TableElement';
import { Relation } from '@/types/Relation';

export default function Home() {
  const [ drawnElements, setDrawnElements ] = useState<TableElement[]>([])
  const [ drawnRelations, setDrawnRelations ] = useState<Relation[]>([])

  const handlerForCallbackSelection = (selectedElement: string) => {
    if (selectedElement == "all") {
      setDrawnElements(
      [
        {
          "name": 'FirstTable',
          "posX": 500,
          "posY": 200,
          "fields": [
            {
              "name": "id",
              "type": "uuid",
              "nullable": false,
              "pk": true
            },
            {
              "name": "SooS",
              "type": "varchar(20)",
              "nullable": false,
            },
            {
              "name": "name",
              "type": "varchar(20)",
              "nullable": false,
            },
          ]
        },
        {
          "name": 'SecondTable',
          "posX": 900,
          "posY": 200,
          "fields": [
            {
              "name": "name",
              "type": "varchar(20)",
              "nullable": false,
            },
            {
              "name": "SooS",
              "type": "varchar(20)",
              "nullable": false,
            },
            {
              "name": "JaaJ",
              "type": "integer",
              "nullable": false,
            },
            {
              "name": "JooJ",
              "type": "integer",
              "nullable": false,
            },
            {
              "name": "SaaS",
              "type": "integer",
              "nullable": false,
            },
          ]
        },
        {
          "name": 'ThirdTable',
          "posX": 500,
          "posY": 600,
          "fields": [
            {
              "name": "name",
              "type": "varchar(20)",
              "nullable": false,
            },
            {
              "name": "SooS",
              "type": "varchar(20)",
              "nullable": false,
            },
            {
              "name": "JaaJ",
              "type": "integer",
              "nullable": false,
            },
            {
              "name": "JooJ",
              "type": "integer",
              "nullable": false,
            },
            {
              "name": "SaaS",
              "type": "integer",
              "nullable": false,
            },
          ]
        },
        {
          "name": 'FourthTable',
          "posX": 900,
          "posY": 600,
          "fields": [
            {
              "name": "name",
              "type": "varchar(20)",
              "nullable": false,
            },
            {
              "name": "SooS",
              "type": "varchar(20)",
              "nullable": false,
            },
            {
              "name": "JaaJ",
              "type": "integer",
              "nullable": false,
            },
            {
              "name": "JooJ",
              "type": "integer",
              "nullable": false,
            },
            {
              "name": "SaaS",
              "type": "integer",
              "nullable": false,
            },
          ]
        },
      ])

      setDrawnRelations(
      [
        { 
          "from": {
            "table": "FirstTable",
            "field": "SooS"
          },
          "to": {
            "table": "SecondTable",
            "field": "SooS"
          }
        },
      ])
    }
  };

  return (
    <Layout>
      <div className={styles.mainDiv}>
        <div className={styles.containerCanvas}>
          <PredefinedTable callbackSelection={handlerForCallbackSelection} />
          {drawnElements ? <CanvasElement drawnElements={drawnElements} drawnRelations={drawnRelations} />: ''}
        </div>
      </div>
    </Layout>
  );
}