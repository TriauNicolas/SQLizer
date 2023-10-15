"use client";
import InfoCardGrid from "@/components/InfoCardGrid/InfoCardGrid";
import ProjectGrid from "@/components/ProjectGrid/ProjectGrid";
import UserTable from "@/components/UserTable/UserTable";
import { users } from "@/dummiesData/users";
import styles from "./page.module.scss";
import { DashboardContext, UserType } from "./layout";
import { useContext, useEffect, useState } from "react";
import { doFetchRequest } from "@/api/fetch";
import CreateGroupButton from "@/components/CreateGroupButton/CreateGroupButton";

const Dashboard = () => {
  const { token, selectedGroupId, setSelectedGroupId, user, data } =
    useContext(DashboardContext);

  const [projects, setProjects] = useState<any>();
  const [groupName, setGroupName] = useState("");

  const handleCreateDatabaseGroup = async () => {
    console.log(token);

    window.location.reload();
    try {
      const newDatabaseGroup = await doFetchRequest({
        method: "POST",
        url: "/database/createDatabaseGroup",
        token,
        data: {
          workgroupId: selectedGroupId,
          dbGroupName: groupName,
        },
      });
      if (newDatabaseGroup) {
        window.location.reload();
      }
    } catch (error) {
      console.error(
        `Error getting databases groups for workgroup: ${selectedGroupId}`,
        error
      );
    }
  };

  const handleGetProjects = async () => {
    if (selectedGroupId !== "") {
      try {
        const loadedProjects = await doFetchRequest({
          method: "GET",
          token,
          url: `/database/getDatabases/${selectedGroupId}`,
        });

        if (loadedProjects) {
          setProjects(loadedProjects);
        }
      } catch (error) {
        console.error(
          `Error getting databases groups for workgroup: ${selectedGroupId}`,
          error
        );
      }
    } else {
      try {
        const loadedProjects = await doFetchRequest({
          method: "GET",
          token,
          url: `/database/getDatabases/${data.workgroups?.[0].workgroups.id}`,
        });

        if (loadedProjects) {
          setProjects(loadedProjects);
        }
      } catch (error) {
        console.error(
          `Error getting databases groups for workgroup: ${data.workgroups?.[0].workgroups.id}`,
          error
        );
      }
    }
  };
  useEffect(() => {
    handleGetProjects();
  }, [selectedGroupId]);

  return (
    <div className={styles.dashboard}>
      <span className={styles.title}>
        <h1 className={`h1 semiBold ${styles.hi}`}>Hi</h1>
        <h1 className={`h1 semiBold ${styles.user}`}>{user?.first_name}</h1>
      </span>

      <InfoCardGrid />
      {selectedGroupId && projects?.databases?.length > 0 ? (
        <>
          <div className={styles.createDbGroup}>
            <input
              type="text"
              value={groupName}
              onChange={(e) => {
                setGroupName(e.target.value);
              }}
              placeholder="Enter database group name"
              className={styles.groupInput}
            />
            <CreateGroupButton
              active={groupName !== ""}
              OnClick={() => handleCreateDatabaseGroup()}
            />
          </div>

          {projects?.databases?.map((_databaseGroup: any) => (
            <div key={_databaseGroup.id}>
              <h3 className="h3 semibold">{_databaseGroup.name}</h3>
              <ProjectGrid group={_databaseGroup} />
            </div>
          ))}
        </>
      ) : selectedGroupId && projects?.databases?.length === 0 ? (
        <div className={styles.createDbGroup}>
          <input
            type="text"
            value={groupName}
            onChange={(e) => {
              setGroupName(e.target.value);
            }}
            placeholder="Enter database group name"
            className={styles.groupInput}
          />
          <CreateGroupButton
            active={groupName !== ""}
            OnClick={() => handleCreateDatabaseGroup()}
          />
        </div>
      ) : (
        <p className={`h2 bold ${styles.pleaseSelect}`}>Select a workgroup</p>
      )}
      <UserTable users={users} />
    </div>
  );
};

export default Dashboard;
