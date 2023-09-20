import modalStyle from './FieldModal.module.css'
import Image from 'next/image'
import closeSVG from '../../../public/CloseCross.svg'
import { useReactFlow, Node } from 'reactflow'
import { useEffect, useState } from 'react'
import { DataTable } from '@/types/tables'

type FieldModalProps = {
  idTable: string | undefined | null;
  closeModal: () => void;
  idField?: string;
}

export const FieldModal = ({ idTable, closeModal, idField }: FieldModalProps) => {
  const { getNodes, getNode, setNodes } = useReactFlow();
  const [ isUpdate, setIsUpdate ] = useState(false);
  const [ infosField, setInfosField ] = useState<Node<any> | undefined>();
  const [ boolAutoInc, setBoolAutoInc ] = useState(false);
  const [ boolPK, setBoolPK ] = useState(false);
  const [ boolFK, setBoolFK ] = useState(false);
  const [ boolNullable, setBoolNullable ] = useState(false);

  // Determine if the modal is for adding or update a field
  useEffect(() => {
    if (idField) {
      setIsUpdate(true)

      const fieldToUpdate = getNode(idField)
      setInfosField(fieldToUpdate)

      setBoolAutoInc(fieldToUpdate?.data.autoIncrement)
      setBoolPK(fieldToUpdate?.data.pk)
      setBoolFK(fieldToUpdate?.data.fk)
      setBoolNullable(fieldToUpdate?.data.nullable)
    }
  }, [idField, getNode, infosField])

  useEffect(() => {

  }, [])

  // Manage possibilities with options
  const handleClickOptions = (type: string) => {
    switch (type) {
      case 'autoInc':
        setBoolAutoInc(!boolAutoInc);
        setBoolNullable(false)
        break;
      case 'pk':
        setBoolPK(!boolPK);
        setBoolFK(false);
        setBoolNullable(false);
        break;
      case 'fk':
        setBoolFK(!boolFK);
        setBoolPK(false);
        setBoolNullable(false);
        break;
      case 'nullable':
        setBoolNullable(!boolNullable);
        setBoolPK(false);
        setBoolFK(false);
        setBoolAutoInc(false);
        break;
    }
  }

  // Triggered by the form
  const validateField = (event: any) => {
    event.preventDefault();
    
    if (!isUpdate) {
      const allNodes = getNodes();
      const numberFieldsInParent = allNodes.filter((node) => node.parentNode === idTable).length;
      const offsetY = 50 + (40 * numberFieldsInParent);
  
      if (idTable) {
        const tableParentNode = getNode(idTable);
        if (tableParentNode) {

          // Prepare node object
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
              autoIncrement: event.target[3].checked,
              pk: event.target[4].checked,
              fk: event.target[5].checked,
              nullable: event.target[6].checked,
            },
            parentNode: idTable,
            draggable: false,
            selected: false,
            hidden: true
          }
          
          // Update the nodes
          setNodes((nodes) => nodes.concat(newField));
        } else {
          console.log("tableParentNode not exists")
        }
      }
    } 
    else {
      const currentNode: any = idField ? getNode(idField) : undefined;

      if (currentNode) {
        const allNodes = getNodes();
        const titleParent = (infosField?.data.title).split('.')[0];

        // Prepare node object
        const updatedField = {
          title: `${titleParent}.${event.target[0].value}`, 
          name: (event.target[0].value).toString(), 
          type: (event.target[1].value).toString(), 
          default: (event.target[2].value).toString(),
          autoIncrement: event.target[3].checked,
          pk: event.target[4].checked,
          fk: event.target[5].checked,
          nullable: event.target[6].checked,
        }

        setNodes(allNodes.map((node) => {
          if (node.id === idField) {
            return ({...node, data: updatedField})
          }
          return ({...node})
        }))
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
                <input id="nameInput" name="name" type="text" className={modalStyle.inputName} defaultValue={infosField ? infosField.data.name : ''} />
              </div>
              <div className={modalStyle.typeContainer}>
                <label htmlFor="type">Type: </label>
                <select name="type" id="type" className={modalStyle.selectType} defaultValue={infosField ? infosField.data.type : ''}>
                  <option value="int">int</option>
                  <option value="varchar">varchar</option>
                  <option value="text">text</option>
                  <option value="boolean">boolean</option>
                </select>
              </div>
              <div className={modalStyle.defaultContainer}>
                <label htmlFor="defaultInput">Default: </label>
                <input id="defaultInput" name="default" type="text" className={modalStyle.inputDefault} defaultValue={infosField ? infosField.data.default : ''} />
              </div>
            </div>
            <div className={modalStyle.optionsContainer}>
              <div className={modalStyle.autoIncContainer}>
                <label htmlFor="autoInc">Auto Increment: </label>
                <input type="checkbox" id="autoInc" name="autoInc" checked={boolAutoInc} onChange={() => handleClickOptions("autoInc")} />
              </div>
              <div className={modalStyle.pkContainer}>
                <label htmlFor="primaryKey">Primary Key: </label>
                <input type="checkbox" id="optionKey" name="primaryKey" checked={boolPK} onChange={() => handleClickOptions("pk")} />
              </div>
              <div className={modalStyle.fkContainer}>
                <label htmlFor="foreignKey">Foreign Key: </label>
                <input type="checkbox" id="optionKey" name="foreignKey" checked={boolFK} onChange={() => handleClickOptions("fk")} />
              </div>
              <div className={modalStyle.isNullContainer}>
                <label htmlFor="isNull">isNull: </label>
                <input type="checkbox" id="isNull" name="isNull" checked={boolNullable} onChange={() => handleClickOptions("nullable")} />
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