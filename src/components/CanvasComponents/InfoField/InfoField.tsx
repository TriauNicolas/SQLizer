import styleInfoField from './InfoField.module.css'
import { useState } from 'react';
import { Field } from '../../../types/tables';
import Image from 'next/image';
import deleteSVG from '../../../public/delete-circle.svg';
import modifySVG from '../../../public/edit-pencil.svg'
import { useReactFlow, Node } from 'reactflow';
import { deleteFieldSocket } from '@/sockets/socketEmitter';

type InfosFieldProps = {
  idNode: string;
  data: Field | undefined;
  updateField: () => void;
}

export const InfosField = ({ idNode, data, updateField }: InfosFieldProps) => {
  const { getNode } = useReactFlow();
  const [ isDeleted, setIsDeleted ] = useState(false);

  const deleteField = () => {
    setIsDeleted(true);

    const nodeToDelete: Node<any> | undefined = getNode(idNode);
    const tableParentName = (nodeToDelete?.data.title).split('.')[0];
    const fieldName = (nodeToDelete?.data.title).split('.')[1];
    
    deleteFieldSocket(tableParentName, fieldName);
  }

  return (
    <>
    {!isDeleted ? (
      <div className={styleInfoField.fieldContainer}>
        <div className={styleInfoField.fieldInfos}>
          <div className={styleInfoField.fieldMainInfos}>
            <div className={styleInfoField.fieldName}>{data?.name}</div>
            <div className={styleInfoField.fieldType}>{data?.type}</div>
          </div>
          <div className={styleInfoField.separationLine}></div>
          <div className={styleInfoField.fieldOptions}>
            <div className={styleInfoField.option}><strong>Default Value : </strong><div>{data?.default ? data?.default: 'No Default value'}</div></div>
            <div className={styleInfoField.option}><strong>Auto Increment : </strong><div>{data?.autoIncrement ? data?.autoIncrement.toString() : 'false'}</div></div>
            <div className={styleInfoField.option}><strong>Primary Key : </strong><div>{data?.pk ? data?.pk.toString() : 'false'}</div></div>
            <div className={styleInfoField.option}><strong>isNull : </strong><div>{data?.nullable ? data?.nullable.toString() : 'false'}</div></div>
          </div>
        </div>
        <div className={styleInfoField.fieldActions}>
          <Image 
            src={deleteSVG}
            height={32}
            width={32}
            priority
            alt="Delete the field"
            onClick={() => deleteField()}
          />
          <Image 
            src={modifySVG}
            height={32}
            width={32}
            priority
            alt="Modify the field"
            onClick={() => updateField()}
          />
        </div>
      </div>
    ) : ('')}
    </>
  )
}