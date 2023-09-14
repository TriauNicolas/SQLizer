import { useCallback, useState, useRef, useEffect, ChangeEvent } from 'react';
import tableStyle from './TableNode.module.css'
import { DataTable } from '../../types/convertedData'

type TableNodeProps = {
  data: DataTable;
}

export const TableNode = ({ data }: TableNodeProps) => {
  const [ titleTable, setTitleTable ] = useState<string>(data.title ? data.title : '')
  const [isEditing, setIsEditing] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  const handleChangeTitle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    data.title = event.target.value
    setTitleTable(event.target.value)
  }, [data])

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