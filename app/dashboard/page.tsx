import InfoCardGrid from "@/components/InfoCardGrid/InfoCardGrid";
import ProjectGrid from "@/components/ProjectGrid/ProjectGrid";
import UserTable from "@/components/UserTable/UserTable";
import { projects } from "@/dummiesData/projects";
import { users } from "@/dummiesData/users";
import styles from "./page.module.scss";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <span className={styles.title}>
        <h1 className={`h1 semiBold ${styles.hi}`}>Hi</h1>
        <h1 className={`h1 semiBold ${styles.user}`}>{`\${user}`}</h1>
        <h2 className={`h2 regular`}>Shrek is love</h2>
      </span>

      <InfoCardGrid />
      <ProjectGrid projects={projects} />
      <UserTable users={users} />
    </div>
  );
};

export default Dashboard;
