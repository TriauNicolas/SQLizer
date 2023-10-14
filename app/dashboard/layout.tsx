import SideBar from "@/components/SideBar/Sidebar";
import Header from "@/components/Header/Header";
import styles from "./page.module.scss";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className={styles.dashboard}>
      <SideBar />
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.contentWrapper}>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
