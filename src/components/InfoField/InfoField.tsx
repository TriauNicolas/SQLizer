import styleInfoField from './InfoField.module.css'
import { useEffect, useState } from 'react';
import { DataTable } from '../../types/tables';
import Image from 'next/image';
import deleteSVG from '../../../public/delete-circle.svg';
import modifySVG from '../../../public/edit-pencil.svg'
import { useReactFlow } from 'reactflow';

type InfosFieldProps = {
  idNode: string;
  data: DataTable | undefined
  updateField: () => void;
}

export const InfosField = ({ idNode, data, updateField }: InfosFieldProps) => {
  const { setNodes } = useReactFlow();
  const [ isDeleted, setIsDeleted ] = useState(false)

  const deleteField = () => {
    setIsDeleted(true)
    setNodes((nodes) => nodes.filter((node) => node.id != idNode))
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
            <div className={styleInfoField.option}><strong>Auto Increment : </strong><div>{data?.autoIncrement == true ? 'true': 'false'}</div></div>
            <div className={styleInfoField.option}><strong>Primary Key : </strong><div>{data?.pk == true ? 'true': 'false'}</div></div>
            <div className={styleInfoField.option}><strong>Foreign Key : </strong><div>{data?.fk == true ? 'true': 'false'}</div></div>
            <div className={styleInfoField.option}><strong>isNull : </strong><div>{data?.nullable == true ? 'true': 'false'}</div></div>
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