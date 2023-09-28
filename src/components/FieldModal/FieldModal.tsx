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
  const [ boolNullable, setBoolNullable ] = useState(false);

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
              name: (event.target[0].value.replace(/ /g, '_')).toString(), 
              type: (event.target[1].value).toString(), 
              default: (event.target[2].value).toString(),
              autoIncrement: event.target[3].checked,
              pk: event.target[4].checked,
              nullable: event.target[5].checked,
            },
            parentNode: idTable,
            draggable: false,
            selected: false,
            hidden: true
          }
          
          // Update the nodes
          setNodes((nodes) => nodes.concat(newField));

          // Update height parent
          if (tableParentNode.style) {
            tableParentNode.style.height = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--baseHeightTableNode").replace("px", "")) + 40;
          }
        } else {
          console.log("tableParentNode not exists");
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
          name: (event.target[0].value.replace(/ /g, '_')).toString(), 
          type: (event.target[1].value).toString(), 
          default: (event.target[2].value).toString(),
          autoIncrement: event.target[3].checked,
          pk: event.target[4].checked,
          nullable: event.target[5].checked,
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
                <label htmlFor="isNull">isNull: </label>
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