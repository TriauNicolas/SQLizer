import { useEffect, useState } from 'react';
import Image from 'next/image'
import { AddFieldModal } from '../AddFieldModal/AddFieldModal';
import styleAddField from './AddFieldNode.module.css'
import svgAdd from '../../../public/SVGAddField.svg'

type AddFieldNodeProps = {
  numberFields: number;
  openModal: () => void;
}

export const AddFieldNode = ({ numberFields, openModal }: AddFieldNodeProps) => {

  // 50 (under title rectangle) & 60 (40 height field & 20 middle height field) * numberFieldsTable to repeat the operation
  const offsetY = (50 + (numberFields * 60));

  const addButtonStyle: {} = {
    position: "absolute",
    width: '32px',
    height: '32px',
    top: `${offsetY}px`,
    left: '45%',
  }
  
  return (
    <div style={addButtonStyle}>
      <Image 
        src={svgAdd}
        height={32}
        width={32}
        alt="Add a field to the table"
        onClick={() => openModal()}
      />
    </div>
  )
}