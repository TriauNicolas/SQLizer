import { doFetchRequest } from "@/api/fetch";
import PlusIcon from "../Icons/PlusIcon";
import styles from "./CreateGroupButton.module.scss";
import { useContext } from "react";
import { DashboardContext } from "../../../app/dashboard/layout";

interface Props {
  active: boolean;
  OnClick: () => void;
}
const CreateGroupButton = ({ active, OnClick }: Props) => {
  return (
    <button
      onClick={OnClick}
      className={`${styles.button} ${active && styles.active}`}
    >
      <PlusIcon />
      <p className="body">Add new group</p>
    </button>
  );
};

export default CreateGroupButton;
