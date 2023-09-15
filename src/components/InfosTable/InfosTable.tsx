import styleTableInfos from './InfosTable.module.css'
import { useEffect } from 'react';
import { InfosTableType } from '../../types/infosTable';

type InfosTableProps = {
  infos: InfosTableType | undefined;
}

export const InfosTable = ({ infos }: InfosTableProps) => {

  useEffect(() => {
    console.log(infos)
  }, [infos])

  return (
    <div>
    </div>
  )
}