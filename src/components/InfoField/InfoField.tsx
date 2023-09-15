import styleInfoField from './InfoField.module.css'
import { useEffect } from 'react';
import { DataTable } from '../../types/tables';
import Image from 'next/image';
import deleteSVG from '../../../public/delete-circle.svg';
import modifySVG from '../../../public/edit-pencil.svg'

type InfosFieldProps = {
  data: DataTable | undefined
}

export const InfosField = ({ data }: InfosFieldProps) => {

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
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
        onClick={() => console.log("Delete")}
      />
      <Image 
        src={modifySVG}
        height={32}
        width={32}
        priority
        alt="Modify the field"
        onClick={() => console.log("Modify")}
      />
      </div>
    </div>
  )
}