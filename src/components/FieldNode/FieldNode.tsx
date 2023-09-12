import { useCallback, useState, useRef, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import fieldStyle from './FieldNode.module.css'
import { Field } from '../../types/convertedData'

type FieldNodeProps = {
  data: Field
}

export const FieldNode = ({ data }: FieldNodeProps) => {
  const [ nameField, setNameField ] = useState<string>()
  const [ typeField, setTypeField ] = useState<string>()
  const [ isEditingName, setIsEditingName ] = useState(false);
  const [ isEditingType, setIsEditingType ] = useState(false);
  const fieldNameRef = useRef<HTMLInputElement>(null);
  const fieldTypeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data?.name) setNameField(data.name)
    if (data?.type) setTypeField(data.type)
  }, [data?.name, data?.type])


  const handleNodeClick = useCallback(() => {
    setIsEditingName(false);
    setIsEditingType(false);
  }, []);

  const handleNameClick = useCallback(() => {
    setIsEditingName(!isEditingName);
  }, [isEditingName]);

  const handleTypeClick = useCallback(() => {
    setIsEditingType(!isEditingType);
  }, [isEditingType]);

  return (
    <div className={fieldStyle.fieldNode} onBlur={handleNodeClick}>
      <Handle type="source" position={Position.Left} />
      <Handle type="target" position={Position.Right} />
      {isEditingName ? (
        <input
          className={fieldStyle.fieldInput}
          type="text"
          ref={fieldNameRef}
          defaultValue={nameField}
          onChange={(event) => setNameField(event.target.value)}
          autoFocus
        />
      ) : (
        <div className={fieldStyle.fieldName} onClick={handleNameClick}>
          {nameField}
        </div>
        )}
      {isEditingType ? (
        <input
          className={fieldStyle.fieldInput}
          type="text"
          ref={fieldTypeRef}
          defaultValue={typeField}
          onChange={(event) => setTypeField(event.target.value)}
          autoFocus
        />
      ) : (
        <div className={fieldStyle.fieldType} onClick={handleTypeClick}>
          {typeField}
        </div>
        )}
    </div>
  )
}