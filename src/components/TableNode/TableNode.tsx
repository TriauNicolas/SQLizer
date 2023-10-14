import { useCallback, useState, useRef, ChangeEvent, useEffect } from 'react';
import tableStyle from './TableNode.module.css';
import { Field } from '../../types/tables';
import { useReactFlow } from 'reactflow';
import { AddFieldNode } from '../AddFieldNode/AddFieldNode';
import { FieldModal } from '../FieldModal/FieldModal';
import { moveTableSocket, updateTableNameSocket } from '@/sockets/socketEmitter';

type TableNodeProps = {
  id: string;
  data: Field;
  selected: boolean;
}

export const TableNode = ({ id, data, selected }: TableNodeProps) => {
  const [ titleTable, setTitleTable ] = useState<string>(data.title ? data.title : '');
  const [ savedTitleTable, setSavedTitleTable ] = useState('');
  const [ isEditing, setIsEditing ] = useState(false);
  const [ numberOfFields, setNumberOfFields ] = useState(0);
  const titleRef = useRef<HTMLInputElement>(null);
  const { getNodes, setNodes, setCenter, getNode } = useReactFlow();
  const [ displayModal, setDisplayModal ] = useState(false);

  // Get number of nodes for addFieldNode
  useEffect(() => {
      setNumberOfFields((getNodes().filter((node) => node.parentNode === id)).length)
  }, [getNodes, numberOfFields, id])

  // Manage changing position and so trigger the socket
  useEffect(() => {
    let positionLoopChecking: number | NodeJS.Timeout;
    if (selected) {
      const currentTable = getNode(id);
      if (currentTable) {
        let posX = currentTable?.position.x;
        let posY = currentTable?.position.y;
        
        positionLoopChecking = setInterval(() => {
          const currentTable = getNode(id);
          if (currentTable && (currentTable?.position.x != posX || currentTable?.position.y != posY)) {
            moveTableSocket(data.title, currentTable?.position.x, currentTable?.position.y);
          }
        }, 1000);
      }
    }

    // Stop the loop if the table is not selected
    return () => {
      if (positionLoopChecking) clearInterval(positionLoopChecking);
    };
  }, [selected, id, getNode, data.title])

  const openModal = () => {
    setDisplayModal(true);

    // Make the modal not moving
    document.documentElement.style.setProperty("--secondaryPointerEvents", "none");
    document.documentElement.style.setProperty("--primaryPointerEvents", "fill");

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
      } else if (node.type === "tableNode") {
        return ({...node, selectable: false, draggable: false})
      }
      return ({...node})
    }))
  }

  const closeModal = () => {
    setDisplayModal(false)

    // Can interact again with the canvas
    document.documentElement.style.setProperty("--secondaryPointerEvents", "all")
    document.documentElement.style.setProperty("--primaryPointerEvents", "all")

    // Reset the options
    const allNodes = getNodes();
    setNodes(allNodes.map((node) => {
      if (node.type === "fieldNode") {
        return ({...node, hidden: false})
      } else if (node.type === "tableNode") {
        return ({...node, selectable: true, draggable: true})
      }
      return ({...node})
    }))
  }

  const handleChangeTitle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    data.title = event.target.value.replace(/ /g, '_');
    setTitleTable(data.title)
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
    <div onBlur={handleNodeClick}>
      {isEditing ? (
        <input
          className={tableStyle.tableInput}
          type="text"
          ref={titleRef}
          defaultValue={data.title}
          onClick={() => setSavedTitleTable(titleTable)}
          onChange={(event) => handleChangeTitle(event)}
          onBlur={() => updateTableNameSocket(savedTitleTable, titleTable)}
        />
      ) : (
        <div className={tableStyle.tableTitle} onClick={handleNodeClick}>
          {data.title}
        </div>
        )}
      {selected ? <AddFieldNode numberFields={numberOfFields} openModal={openModal} /> : ''}
      {displayModal ? <FieldModal idTable={id} closeModal={closeModal} /> : ''}
    </div>
  );
};