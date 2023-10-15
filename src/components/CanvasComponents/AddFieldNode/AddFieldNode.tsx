import Image from 'next/image';
import svgAdd from '../../../public/SVGAddField.svg';
import { useEffect, useState } from 'react';

type AddFieldNodeProps = {
  numberFields: number;
  openModal: () => void;
}

export const AddFieldNode = ({ numberFields, openModal }: AddFieldNodeProps) => {
  const [ offsetY, setOffsetY ] = useState((50 + (numberFields * 45)));

  useEffect(() => {
    // 50 (under title rectangle) & 45 (40 height field & 5 to center it) * numberFieldsTable to repeat the operation
    setOffsetY(50 + (numberFields * 45))
  }, [offsetY, numberFields])

  const addButtonStyle: {} = {
    position: "absolute",
    width: '32px',
    height: '32px',
    top: `${offsetY}px`,
    left: '42%',
  }
  
  return (
    <div style={addButtonStyle}>
      <Image 
        src={svgAdd}
        height={32}
        width={32}
        priority
        alt="Add a field to the table"
        onClick={() => openModal()}
      />
    </div>
  )
}