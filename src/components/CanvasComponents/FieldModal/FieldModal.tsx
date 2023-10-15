import modalStyle from './FieldModal.module.css'
import Image from 'next/image'
import closeSVG from '../../../../public/CloseCross.svg'
import { useReactFlow, Node } from 'reactflow'
import { useEffect, useState} from 'react'
import { addFieldSocket, updateFieldSocket } from '@/sockets/socketEmitter'

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
  const [ boolNullable, setBoolNullable ] = useState(false);
  const [ typeSelectValue, setTypeSelectValue ] = useState("");

  // Determine if the modal is for adding or update a field
  useEffect(() => {
    if (idField) {
      setIsUpdate(true)

      const fieldToUpdate = getNode(idField)
      setInfosField(fieldToUpdate)

      setBoolAutoInc(fieldToUpdate?.data.autoIncrement)
      setBoolPK(fieldToUpdate?.data.pk)
      setBoolNullable(fieldToUpdate?.data.nullable)
    }
  }, [idField, getNode, infosField])
  
  const handleTypeSelectValueChange = (event: any) => {
    setTypeSelectValue(event.target.value)
  }

  // Manage possibilities with options
  const handleClickOptions = (type: string) => {
    switch (type) {
      case 'autoInc':
        setBoolAutoInc(!boolAutoInc);
        setBoolNullable(false)
        break;
      case 'pk':
        setBoolPK(!boolPK);
        setBoolNullable(false);
        break;
      case 'nullable':
        setBoolNullable(!boolNullable);
        setBoolPK(false);
        setBoolAutoInc(false);
        break;
    }
  }

  // Triggered by the form
  const validateField = (event: any) => {
    event.preventDefault();
    
    if (!isUpdate && idTable) {
      const tableParentNode = getNode(idTable);        
      
      if (tableParentNode) {
        console.log(event.target)
        const type = (typeSelectValue === 'varchar' || typeSelectValue === 'char') ? (event.target[1].value).toString() + `(${(event.target[2].value).toString()})` : (event.target[1].value).toString()
        const newField = { 
          title: `${tableParentNode.data.title}.${event.target[0].value}`, 
          name: (event.target[0].value.replace(/ /g, '_')).toString(), 
          type, 
          default: (event.target[3].value).toString(),
          autoIncrement: event.target[4].checked,
          pk: event.target[5].checked,
          nullable: event.target[6].checked,
        }
        
        // Send socket
        addFieldSocket(newField, tableParentNode.data.title);
      } else {
        console.log("tableParentNode not exists");
      }
    } 
    else {
      const currentNode: Node<any> | undefined = idField ? getNode(idField) : undefined;

      if (currentNode) {
        const titleParent: string = (infosField?.data.title).split('.')[0];
        const nameField: string = currentNode.data.name;

        // Prepare node object
        const updatedField = {
          title: `${titleParent}.${event.target[0].value}`, 
          name: (event.target[0].value.replace(/ /g, '_')).toString(), 
          type: (event.target[1].value).toString(), 
          default: (event.target[3].value).toString(),
          autoIncrement: event.target[4].checked,
          pk: event.target[5].checked,
          nullable: event.target[6].checked,
        }
        
        updateFieldSocket(titleParent, nameField, updatedField);
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
                <select name="type" id="type" className={modalStyle.selectType} defaultValue={infosField ? infosField.data.type : ''} onChange={handleTypeSelectValueChange}>
                {[
                  "int",
                  "bit",
                  "tinyint",
                  "smallint",
                  "int",
                  "bigint",
                  "decimal",
                  "numeric",
                  "float",
                  "real",
                  "bool",
                  "decimal",
                  "varchar",
                  "char",
                  "Text",
                  "Date",
                  "time",
                  "datetime",
                  "timestamp",
                  "year",
                  "Json",
                  "Clob",
                  "Blob",
                  "Xml",
                  "Json"
                ].map((type, index) => (
                  <option className="typeOptions" key={index} value={type}>
                    {type}
                  </option>
                ))}
                </select>
                <div className={(typeSelectValue !== 'varchar' && typeSelectValue !== 'char') ? modalStyle.inputSpecial : ''}>
                  <label htmlFor="size">Size: </label>
                  <input
                   id="size" 
                   name="size" 
                   type="number" 
                   min="1"
                   max={typeSelectValue === 'varchar' ? "255" : "65535"}
                   className={modalStyle.inputDefault} 
                   defaultValue={infosField ? infosField.data.default : ''} 
                   />
                </div>
              </div>
              <div className={modalStyle.defaultContainer}>
                <label htmlFor="defaultInput">Default: </label>
                <input id="defaultInput" name="default" type="text" className={modalStyle.inputDefault} defaultValue={infosField ? infosField.data.default : ''} />
              </div>
            </div>
            <div className={modalStyle.optionsContainer}>
              <div className={modalStyle.autoIncContainer}>
                <label htmlFor="autoInc">Auto Increment: </label>
                <input type="checkbox" className={modalStyle.autoInc} name="autoInc" checked={boolAutoInc} onChange={() => handleClickOptions("autoInc")} />
              </div>
              <div className={modalStyle.pkContainer}>
                <label htmlFor="primaryKey">Primary Key: </label>
                <input type="checkbox" className={modalStyle.primaryKey} name="primaryKey" checked={boolPK} onChange={() => handleClickOptions("pk")} />
              </div>
              <div className={modalStyle.isNullContainer}>
                <label htmlFor="isNull">Nullable: </label>
                <input type="checkbox" className={modalStyle.isNull} name="isNull" checked={boolNullable} onChange={() => handleClickOptions("nullable")} />
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