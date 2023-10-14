import PlusIcon from "../Icons/PlusIcon";
import styles from "./CreateGroupButton.module.scss";

const CreateGroupButton = () => {
  // TODO: Define function createNewGroup
  return (
    <button
      onClick={() => {}} // TODO: use createNewGroupFunction
      className={styles.button}
    >
      <PlusIcon />
      <p className="body">Add new group</p>
    </button>
  );
};

export default CreateGroupButton;
