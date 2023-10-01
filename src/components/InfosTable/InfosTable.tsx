import styleTableInfos from './InfosTable.module.css'
import { useEffect, useState } from 'react';
import { InfosTableType } from '../../types/infosTable';
import { InfosField } from '../InfoField/InfoField';
import { FieldModal } from '../FieldModal/FieldModal';
import { useReactFlow, Node } from 'reactflow';
import { useNodes } from '@/hooks/useNodes';

type InfosTableProps = {
  currentNodes: Node<any>[];
}

export const InfosTable = ({ currentNodes }: InfosTableProps) => {
  const [ tableInfos, setTableInfos ] = useState<InfosTableType>();
  const { setNodes } = useNodes();
  const [ displayModal, setDisplayModal ] = useState(false);
  const { getNodes, getEdges, deleteElements } = useReactFlow();
  const [ fieldToDisplay, setFieldToDisplay ] = useState("");
  const [ displayInfos, setDisplayInfos ] = useState(false);

  // Prepare the infos to show at the left of the screen --> Infos of the table
  useEffect(() => {
    const tableParent = currentNodes.find((node: Node) => node.selected === true && node.type != "fieldNode");
    if (tableParent) {
      let fieldsChildren: any[] = [];
      fieldsChildren = getNodes().filter((node: Node) => node.parentNode === tableParent.id);

      setTableInfos({ 
        tableParent: { id: tableParent?.id, data: tableParent?.data }, 
        fieldsChildren: fieldsChildren
        });
    }

  }, [currentNodes, getNodes]);

  useEffect(() => {
    setDisplayInfos(true);
  }, [tableInfos]);

  const handleUpdateField = (idField: string) => {
    setDisplayModal(true);
    setFieldToDisplay(idField);
  }

  const handleDropTable = () => {
    // Remove the tableNode and the fieldNode related to the table
    const nodesToDelete = getNodes().filter((node) => node.id === tableInfos?.tableParent.id || node.parentNode === tableInfos?.tableParent.id);

    // Remove the edges related
    const allNodesRelatedToTable = getNodes().filter((node) => node.id === tableInfos?.tableParent.id || node.parentNode === tableInfos?.tableParent.id);
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
    { tableInfos?.tableParent?.data?.title && displayInfos ? (
      <div className={styleTableInfos.infosContainer}>
        <h2 className={styleTableInfos.titleTable}>{tableInfos?.tableParent?.data?.title}</h2>
        <div className={styleTableInfos.infosFields}>
          { tableInfos.fieldsChildren.map((node: any) => {
              return <InfosField key={node.id} idNode={node.id} data={node.data} updateField={() => handleUpdateField(node.id)} />
          }) }
        </div>
        <button className={styleTableInfos.dropTable} onClick={handleDropTable}>DROP TABLE</button>
        {displayModal ? <FieldModal idTable={tableInfos?.tableParent.id} closeModal={closeModal} idField={fieldToDisplay} /> : ''}
      </div>
    ) : ('')}
    </>
  )
}