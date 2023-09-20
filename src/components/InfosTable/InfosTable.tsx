import styleTableInfos from './InfosTable.module.css'
import { useEffect, useState } from 'react';
import { InfosTableType } from '../../types/infosTable';
import { Node } from 'reactflow'
import { InfosField } from '../InfoField/InfoField';
import { DataTable } from '@/types/tables';
import { FieldModal } from '../FieldModal/FieldModal';
import { useReactFlow } from 'reactflow';

type InfosTableProps = {
  infos: InfosTableType | undefined;
}

export const InfosTable = ({ infos }: InfosTableProps) => {
  const [ displayModal, setDisplayModal ] = useState(false);
  const { getNodes, setNodes } = useReactFlow();
  const [ fieldToDisplay, setFieldToDisplay ] = useState("");
  const [ currentTableInfo, setCurrentTableInfo ] = useState<any>();

  useEffect(() => {
    setCurrentTableInfo(infos)
  }, [infos])

  const handleUpdateField = (idField: string) => {
    setDisplayModal(true)
    setFieldToDisplay(idField)
  }

  const closeModal = () => {
    setDisplayModal(false)

    const allNodes = getNodes();
    setNodes(allNodes.map((node) => {
      if (node.type === "fieldNode") {
        return ({...node, hidden: false})
      }
      return ({...node})
    }))
  }

  return (
    <>
    { currentTableInfo?.tableParent?.data?.title ? (
      <div className={styleTableInfos.infosContainer}>
        <h2 className={styleTableInfos.titleTable}>{currentTableInfo?.tableParent?.data?.title}</h2>
        <div className={styleTableInfos.infosFields}>
          { currentTableInfo.fieldsChildren.map((node: any) => {
              return <InfosField key={node.id} idNode={node.id} data={node.data} updateField={() => handleUpdateField(node.id)} />
          }) }
        </div>
        <button className={styleTableInfos.dropTable}>DROP TABLE</button>
        {displayModal ? <FieldModal idTable={currentTableInfo?.tableParent.id} closeModal={closeModal} idField={fieldToDisplay} /> : ''}
      </div>
    ) : ('')}
    </>
  )
}