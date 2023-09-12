import { useCallback, useState, useRef } from 'react';

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
    <div className='table-node' onClick={handleNodeClick} onBlur={handleNodeClick}>
      <div
        style={{
          width: '100px',
          height: '200px',
          backgroundColor: 'white',
          border: '1.5px solid #000',
          borderRadius: '5px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'black',
        }}
      >
        {isEditing ? (
          <input
            type="text"
            ref={titleRef}
            defaultValue={titleTable}
            onChange={(event) => setTitleTable(event.target.value)}
            autoFocus
          />
        ) : (
          <div>
            {titleTable}
          </div>
          )}
      </div>
    </div>
  );
};