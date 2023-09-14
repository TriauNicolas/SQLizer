import { useCallback, useState, useRef, useEffect } from 'react';
import tableStyle from './TableNode.module.css'
import { DataTable } from '../../types/convertedData'

type TableNodeProps = {
  data: DataTable
}

export const TableNode = ({ data }: TableNodeProps) => {
  const [ titleTable, setTitleTable ] = useState<string>(data.title ? data.title : '')
  const [isEditing, setIsEditing] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   const nodesArray: Node[] = getNodes()
  // }, [titleTable])

  const handleNodeClick = useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing]);

  return (
    <div className={tableStyle.tableNode} onBlur={handleNodeClick}>
      {isEditing ? (
        <input
          className={tableStyle.tableInput}
          type="text"
          ref={titleRef}
          defaultValue={titleTable}
          onChange={(event) => setTitleTable(event.target.value)}
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