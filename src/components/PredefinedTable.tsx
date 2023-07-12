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
      <PredefinedButton nameButton='classic rectangle' elementClickHandler={elementClickHandler}/>
      <PredefinedButton nameButton='SooS la Saucisse' elementClickHandler={elementClickHandler}/>
    </div>
  )
}