import styles from './PredefinedTable.module.css';
import { PredefinedButton } from '../PredefinedButton';

type PredefinedTableProps = {
  callbackSelection: (elementName: string) => void;
};

export const PredefinedTable: React.FC<PredefinedTableProps> = ({
  callbackSelection,
}) => {
  const elementClickHandler = (elementName: string) => {
    callbackSelection(elementName);
  };

  return (
    <div className={styles.columnElements}>
      <PredefinedButton
        nameButton="All"
        elementClickHandler={elementClickHandler}
      />
      <PredefinedButton
        nameButton="Blank"
        elementClickHandler={elementClickHandler}
      />
    </div>
  );
};
