import styleTableInfos from './InfosTable.module.css'
import { useEffect, useState } from 'react';
import { InfosTableType } from '../../types/infosTable';
import { InfosField } from '../InfoField/InfoField';
import { FieldModal } from '../FieldModal/FieldModal';
import { useReactFlow } from 'reactflow';

type InfosTableProps = {
  infos: InfosTableType | undefined;
}

export const InfosTable = ({ infos }: InfosTableProps) => {
  const [ displayModal, setDisplayModal ] = useState(false);
  const { getNodes, setNodes, getEdges, deleteElements } = useReactFlow();
  const [ fieldToDisplay, setFieldToDisplay ] = useState("");
  const [ currentTableInfo, setCurrentTableInfo ] = useState<any>();
  const [ displayInfos, setDisplayInfos ] = useState(false);

  useEffect(() => {
    setCurrentTableInfo(infos);
    setDisplayInfos(true);
  }, [infos])

  const handleUpdateField = (idField: string) => {
    setDisplayModal(true);
    setFieldToDisplay(idField);
  }

  const handleDropTable = () => {
    // Remove the tableNode and the fieldNode related to the table
    const nodesToDelete = getNodes().filter((node) => node.id === currentTableInfo?.tableParent.id || node.parentNode === currentTableInfo?.tableParent.id);

    // Remove the edges related
    const allNodesRelatedToTable = getNodes().filter((node) => node.id === currentTableInfo?.tableParent.id || node.parentNode === currentTableInfo?.tableParent.id);
    const allIds = allNodesRelatedToTable.map((node) => node.id);
    const edgesToDelete = getEdges().filter((edge) => allIds.includes(edge.source) || allIds.includes(edge.target));
    
    // Remove function elements
    deleteElements({ nodes: nodesToDelete, edges: edgesToDelete });

    // Stop displaying the infos
    setDisplayInfos(false);
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
    { currentTableInfo?.tableParent?.data?.title && displayInfos ? (
      <div className={styleTableInfos.infosContainer}>
        <h2 className={styleTableInfos.titleTable}>{currentTableInfo?.tableParent?.data?.title}</h2>
        <div className={styleTableInfos.infosFields}>
          { currentTableInfo.fieldsChildren.map((node: any) => {
              return <InfosField key={node.id} idNode={node.id} data={node.data} updateField={() => handleUpdateField(node.id)} />
          }) }
        </div>
        <button className={styleTableInfos.dropTable} onClick={handleDropTable}>DROP TABLE</button>
        {displayModal ? <FieldModal idTable={currentTableInfo?.tableParent.id} closeModal={closeModal} idField={fieldToDisplay} /> : ''}
      </div>
    ) : ('')}
    </>
  )
}