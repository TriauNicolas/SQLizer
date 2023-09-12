import { useCallback, useState, useRef } from 'react';
import tableStyle from './TableNode.module.css'

type TableNodeProps = {
  data: {
    label: string
  }
}

export const TableNode = ({ data }: TableNodeProps) => {
  const [ titleTable, setTitleTable ] = useState<string>()
  if (!data?.label) setTitleTable(data.label)

  const [isEditing, setIsEditing] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

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