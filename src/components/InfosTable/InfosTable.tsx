import styleTableInfos from './InfosTable.module.css'
import { useEffect, useState } from 'react';
import { InfosTableType } from '../../types/infosTable';
import { Node } from 'reactflow'
import { InfosField } from '../InfoField/InfoField';
import { DataTable } from '@/types/tables';

type InfosTableProps = {
  infos: InfosTableType | undefined;
}

export const InfosTable = ({ infos }: InfosTableProps) => {

  return (
    <>
    { infos?.tableParent?.data?.title ? (
      <div className={styleTableInfos.infosContainer}>
        <h2 className={styleTableInfos.titleTable}>{infos?.tableParent?.data?.title}</h2>
        <div className={styleTableInfos.infosFields}>
          { infos.fieldsChildren.map((node: any) => {
              return <InfosField key={node.id} idNode={node.id} data={node.data} />
          }) }
        </div>
        <button className={styleTableInfos.dropTable}>DROP TABLE</button>
      </div>
    ) : ('')}
    </>
  )
}