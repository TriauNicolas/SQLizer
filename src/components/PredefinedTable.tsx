import styles from '../app/page.module.css';
import { PredefinedButton } from '../components/PredefinedButton'

type PredefinedTableProps = {
  callbackSelection: (elementName: string) => void;
}

export const PredefinedTable: React.FC<PredefinedTableProps> = ({ callbackSelection }) => {

  const elementClickHandler = (elementName: string) => {
    callbackSelection(elementName)
  }

  return(
    <div className={styles.columnElements}>
      <PredefinedButton nameButton='circle' elementClickHandler={elementClickHandler}/>
      <PredefinedButton nameButton='rectangle' elementClickHandler={elementClickHandler}/>
    </div>
  )
}