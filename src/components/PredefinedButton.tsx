import styles from '../app/page.module.css';

interface PredefinedButtonProps {
  nameButton: string
  elementClickHandler: Function
}

export const PredefinedButton: React.FC<PredefinedButtonProps> = ({ nameButton, elementClickHandler }) => {

    return <button onClick={() => elementClickHandler(nameButton.toLowerCase())} className={styles.predifinedElementButton}>{nameButton}</button>
}