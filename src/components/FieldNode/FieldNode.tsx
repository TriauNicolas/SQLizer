import { useCallback, useState, useRef, useEffect, ChangeEvent } from 'react';
import { Handle, Position } from 'reactflow';
import fieldStyle from './FieldNode.module.css'
import { Field } from '../../types/tables'

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

  const handleChangeNameandType = ((event: ChangeEvent<HTMLInputElement>) => {
    if (isEditingName) {
      data.name = event.target.value
      setNameField(event.target.value)
    }
    else if (isEditingType) {
      data.type = event.target.value
      setTypeField(event.target.value)
    }
  })

  const handleNodeClick = useCallback(() => {
    setIsEditingName(false);
    setIsEditingType(false);
  }, []);

  const handleNameClick = useCallback(() => {
    setIsEditingName(!isEditingName);
  }, [isEditingName]);

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
          onChange={(event) => handleChangeNameandType(event)}
          autoFocus
        />
      ) : (
        <div className={fieldStyle.fieldName} onClick={handleNameClick}>
          {nameField}
        </div>
        )}
      <div className={fieldStyle.fieldType}>
        {typeField}
      </div>
    </div>
  )
}