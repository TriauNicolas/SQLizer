import { useCallback, useState, useRef, ChangeEvent, useEffect } from 'react';
import tableStyle from './TableNode.module.css';
import { DataTable } from '../../types/tables';
import { useReactFlow } from 'reactflow';
import { AddFieldNode } from '../AddFieldNode/AddFieldNode';
import { FieldModal } from '../FieldModal/FieldModal';

type TableNodeProps = {
  id: string;
  data: DataTable;
  selected: boolean;
}

export const TableNode = ({ id, data, selected }: TableNodeProps) => {
  const [ titleTable, setTitleTable ] = useState<string>(data.title ? data.title : '');
  const [ isEditing, setIsEditing ] = useState(false);
  const [ numberOfFields, setNumberOfFields ] = useState(0);
  const titleRef = useRef<HTMLInputElement>(null);
  const { getNodes, setNodes, setViewport, setCenter, getNode } = useReactFlow();
  const refCanvas = useReactFlow();
  const [ displayModal, setDisplayModal ] = useState(false);

  useEffect(() => {
      setNumberOfFields((getNodes().filter((node) => node.parentNode === id)).length)
  }, [selected, getNodes, numberOfFields, id])

  const openModal = () => {
    setDisplayModal(true)

    // Determine the position of the camera
    const currentNode = getNode(id)
    if (currentNode) {
      // Set the camera in order to make the modal taking the full canvas screen
      setCenter(currentNode.position.x, currentNode.position.y, {zoom: 1})
    }

    // Make the modal go in front of the z axe
    const allNodes = getNodes()
    setNodes(allNodes.map((node) => {
      if (node.type === "fieldNode") {
        return ({...node, hidden: true})
      }
      return ({...node})
    }))
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

  const handleChangeTitle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    data.title = event.target.value
    setTitleTable(event.target.value)
  }, [data])

  const handleNodeClick = useCallback(() => {
    setIsEditing(!isEditing);

    const currentNodes = getNodes();
    const nodesIdToChange: string[] = [];
    currentNodes.forEach((node) => {
      if (node.parentNode === id) {
        nodesIdToChange.push(node.id)
      }
    })
    setNodes(currentNodes.map((node) => {
      if (nodesIdToChange.includes(node.id)) {
        return ({...node, data: { 
          title: `${titleTable}.${node.data.name}`, 
          name: node.data.name, 
          type: node.data.type, 
          default: node.data.default, 
          autoIncrement: node.data.autoIncrement,
          pk: node.data.pk,
          nullable: node.data.nullable,
        }})
      }
      return ({...node})
    }))

  }, [isEditing, setNodes, getNodes, id, titleTable]);

  return (
    <div className={tableStyle.tableNode} onBlur={handleNodeClick}>
      {isEditing ? (
        <input
          className={tableStyle.tableInput}
          type="text"
          ref={titleRef}
          defaultValue={titleTable}
          onChange={(event) => handleChangeTitle(event)}
          autoFocus
        />
      ) : (
        <div className={tableStyle.tableTitle} onClick={handleNodeClick}>
          {titleTable}
        </div>
        )}
      {selected ? <AddFieldNode numberFields={numberOfFields} openModal={openModal} /> : ''}
      {displayModal ? <FieldModal idTable={id} closeModal={closeModal} /> : ''}
    </div>
  );
};