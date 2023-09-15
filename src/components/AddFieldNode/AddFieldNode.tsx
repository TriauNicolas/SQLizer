import Image from 'next/image';
import svgAdd from '../../../public/SVGAddField.svg';

type AddFieldNodeProps = {
  numberFields: number;
  openModal: () => void;
}

export const AddFieldNode = ({ numberFields, openModal }: AddFieldNodeProps) => {

  // 50 (under title rectangle) & 60 (40 height field & 20 middle height field) * numberFieldsTable to repeat the operation
  const offsetY = (50 + (numberFields * 45));

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