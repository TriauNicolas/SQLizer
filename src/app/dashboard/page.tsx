import ProjectGrid from "@/components/ProjectGrid/ProjectGrid";
import { projects } from "@/dummiesData/projects";

const Dashboard = () => {
  return <ProjectGrid projects={projects} />;
};

export default Dashboard;
