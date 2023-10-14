import InfoCardGrid from "@/components/InfoCardGrid/InfoCardGrid";
import ProjectGrid from "@/components/ProjectGrid/ProjectGrid";
import UserTable from "@/components/UserTable/UserTable";
import { projects } from "@/dummiesData/projects";
import { users } from "@/dummiesData/users";

const Dashboard = () => {
  return (
    <>
      <InfoCardGrid />
      <ProjectGrid projects={projects} />
      <UserTable users={users} />
    </>
  );
};

export default Dashboard;
