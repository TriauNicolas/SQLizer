import modalStyle from './FieldModal.module.css'
import Image from 'next/image'
import closeSVG from '../../../public/CloseCross.svg'
import { useReactFlow, Node } from 'reactflow'
import { useEffect, useState } from 'react'

type FieldModalProps = {
  idTable: string | undefined | null;
  closeModal: () => void;
  idField?: string;
}

export const FieldModal = ({ idTable, closeModal, idField }: FieldModalProps) => {
  const { getNodes, getNode, setNodes } = useReactFlow();
  const [ isUpdate, setIsUpdate ] = useState(false)
  const [ infosField, setInfosField ] = useState<Node<any> | undefined>()

  useEffect(() => {
    if (idField) {
      setIsUpdate(true)

      const fieldToUpdate = getNode(idField)
      setInfosField(fieldToUpdate)
    }
  }, [idField, getNode])

  const validateField = (event: any) => {
    event.preventDefault()
    
    // If idField is undefined it's an Add
    // Otherwise, it's an update
    if (!isUpdate) {
      const allNodes = getNodes();
      const numberFieldsInParent = allNodes.filter((node) => node.parentNode === idTable).length;
      const offsetY = 50 + (40 * numberFieldsInParent);
  
      if (idTable) {
        const tableParentNode = getNode(idTable);
        if (tableParentNode) {
          const newField = { 
            id: (allNodes.length + 1).toString(),
            type: "fieldNode", 
            position: { x: 0, y: offsetY },
            positionAbsolute: { x: 0, y: offsetY },
            data: { 
              title: `${tableParentNode.data.title}.${event.target[0].value}`, 
              name: (event.target[0].value).toString(), 
              type: (event.target[1].value).toString(), 
              default: (event.target[2].value).toString(),
              autoIncrement: (event.target[3].checked).toString(),
              pk: (event.target[4].checked).toString(),
              fk: (event.target[5].checked).toString(),
              nullable: (event.target[6].checked).toString(),
            },
            parentNode: idTable,
            draggable: false,
            selected: false,
            hidden: false
          }
          
          setNodes((nodes) => nodes.concat(newField));
        } else {
          console.log("tableParentNode not exists")
        }
      }
    }
  }
  
  return (
    <div className={`${idField == undefined ? modalStyle.modalContainer : modalStyle.modalUpdateContainer}`}>
      <Image 
      className={modalStyle.closeCross}
      src={closeSVG}
      height={32}
      width={32}
      priority
      alt="Add a field to the table"
      onClick={() => closeModal()}
      />
      <form onSubmit={validateField}>
        <div className={modalStyle.containerForm}>
          <div className={modalStyle.fieldInfosContainer}>
            <div className={modalStyle.infosContainer}>
              <div className={modalStyle.nameContainer}>
                <label htmlFor="nameInput">Name: </label>
                <input id="nameInput" name="name" type="text" className={modalStyle.inputName} value={infosField ? infosField.data.name : ''} />
              </div>
              <div className={modalStyle.typeContainer}>
                <label htmlFor="type">Type: </label>
                <select name="type" id="type" className={modalStyle.selectType} value={infosField ? infosField.data.type : ''}>
                  <option value="int">int</option>
                  <option value="varchar">varchar</option>
                  <option value="text">text</option>
                  <option value="boolean">boolean</option>
                </select>
              </div>
              <div className={modalStyle.defaultContainer}>
                <label htmlFor="defaultInput">Default: </label>
                <input id="defaultInput" name="default" type="text" className={modalStyle.inputDefault} value={infosField ? infosField.data.default : ''} />
              </div>
            </div>
            <div className={modalStyle.optionsContainer}>
              <div className={modalStyle.autoIncContainer}>
                <label htmlFor="autoInc">Auto Increment: </label>
                <input type="checkbox" id="autoInc" name="autoInc" />
              </div>
              <div className={modalStyle.pkContainer}>
                <label htmlFor="primaryKey">Primary Key: </label>
                <input type="radio" id="optionKey" name="primaryKey" />
              </div>
              <div className={modalStyle.fkContainer}>
                <label htmlFor="foreignKey">Foreign Key: </label>
                <input type="radio" id="optionKey" name="foreignKey" />
              </div>
              <div className={modalStyle.isNullContainer}>
                <label htmlFor="isNull">isNull: </label>
                <input type="checkbox" id="isNull" name="isNull" />
              </div>
            </div>
          </div>
          <div className={modalStyle.validationContainer}>
            <div className={modalStyle.lineValidation}></div>
            <button className={modalStyle.buttonValidation}>Validate</button>
          </div>
        </div>
      </form>
    </div>
  )
}