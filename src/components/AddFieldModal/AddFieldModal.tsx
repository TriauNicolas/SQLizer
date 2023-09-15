import modalStyle from './AddFieldModal.module.css'
import Image from 'next/image'
import closeSVG from '../../../public/CloseCross.svg'

type AddFieldModalProps = {
  closeModal: () => void
}

export const AddFieldModal = ({ closeModal }: AddFieldModalProps) => {
  
  return (
    <div className={modalStyle.modalContainer}>
      <Image 
      className={modalStyle.closeCross}
      src={closeSVG}
      height={32}
      width={32}
      alt="Add a field to the table"
      onClick={() => closeModal()}
      />
      <div className={modalStyle.containerForm}>
        <div className={modalStyle.fieldInfosContainer}>
          <div className={modalStyle.infosContainer}>
            <div className={modalStyle.nameContainer}>
              <label htmlFor="nameInput">Name: </label>
              <input id="nameInput" name="name" type="text" className={modalStyle.inputName}/>
            </div>
            <div className={modalStyle.typeContainer}>
              <label htmlFor="type">Type: </label>
              <select name="type" id="type" className={modalStyle.selectType}>
                <option value="int">int</option>
                <option value="varchar">varchar</option>
                <option value="text">text</option>
                <option value="boolean">boolean</option>
              </select>
            </div>
            <div className={modalStyle.defaultContainer}>
              <label htmlFor="defaultInput">Default: </label>
              <input id="defaultInput" name="default" type="text" className={modalStyle.inputDefault}/>
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
    </div>
  )
}