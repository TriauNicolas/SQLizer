import { useCallback, useState, useRef, ChangeEvent } from 'react';
import tableStyle from './TableNode.module.css'
import { DataTable } from '../../types/convertedData'
import { useReactFlow } from 'reactflow';

type TableNodeProps = {
  id: string;
  data: DataTable;
}

export const TableNode = ({ id, data }: TableNodeProps) => {
  const [ titleTable, setTitleTable ] = useState<string>(data.title ? data.title : '')
  const [isEditing, setIsEditing] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const { getNodes, setNodes } = useReactFlow();

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
        console.log("Here " + node.data.name)
        return ({...node, data: { title: `${titleTable}.${node.data.name}`, name: node.data.name, type: node.data.type}})
      }
      console.log("Not Here " + node.data.name)
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
    </div>
  );
};