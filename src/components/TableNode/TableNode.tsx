import { useCallback, useState, useRef, ChangeEvent, useEffect } from 'react';
import tableStyle from './TableNode.module.css';
import { DataTable } from '../../types/tables';
import { useReactFlow } from 'reactflow';
import { AddFieldNode } from '../AddFieldNode/AddFieldNode';
import { AddFieldModal } from '../AddFieldModal/AddFieldModal';

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
  const { getNodes, setNodes, setViewport, getNode } = useReactFlow();
  const [ displayModal, setDisplayModal ] = useState(false);

  useEffect(() => {
    if (selected) {
      setNumberOfFields((getNodes().filter((node) => node.parentNode === id)).length)
    }
  }, [selected, getNodes, numberOfFields, id])

  const openModal = () => {
    setDisplayModal(true)

    // Determine the position of the camera
    const currentNode = getNode(id)
    if (currentNode) {
      setViewport({ 
          x: ((window.innerWidth / 2) * 0.80) + Math.abs(currentNode?.position.x) - 75, 
          y: (window.innerHeight / 2) + ((currentNode?.position.y) * -1) - 125, 
          zoom: 1 
        })
    }

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
        return ({...node, data: { title: `${titleTable}.${node.data.name}`, name: node.data.name, type: node.data.type}})
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
      {displayModal ? <AddFieldModal idTable={id} closeModal={closeModal} /> : ''}
    </div>
  );
};