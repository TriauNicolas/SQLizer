import styles from "./Sidebar.module.scss";

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <h2>SQLizer</h2>
      <ul>
        <li>Projects</li>
        <li>Teams</li>
        <li>Projects</li>
        <li>Settings</li>
      </ul>
    </div>
  );
};

export default SideBar;
