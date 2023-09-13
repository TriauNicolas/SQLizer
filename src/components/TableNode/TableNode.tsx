import { useCallback, useState, useRef, useEffect } from 'react';
import tableStyle from './TableNode.module.css'
import { FieldNode } from '../FieldNode/FieldNode';

type TableNodeProps = {
  id: string
}

export const TableNode = ({ id  }: TableNodeProps) => {
  const [ titleTable, setTitleTable ] = useState<string>()
  const [isEditing, setIsEditing] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (id) setTitleTable(id)
  }, [id])

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