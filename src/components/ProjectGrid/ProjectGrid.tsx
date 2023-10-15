"use client";
import ProjectPreview from "@/components/ProjectPreview/ProjectPreview";
import styles from "./ProjectGrid.module.scss";
import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../../app/dashboard/layout";
import { doFetchRequest } from "@/api/fetch";
import { useRouter } from "next/navigation";

interface Props {
  group: any;
}
const ProjectGrid = ({ group }: Props) => {
  const { token, data, setData, selectedGroupId, setSelectedGroupId } =
    useContext(DashboardContext);
  const router = useRouter();

  const handleDuplicateDatabase = async (databaseId: any) => {
    console.log("databaseId", databaseId);
    console.log("workgroupId", selectedGroupId);
    console.log("databaseGroupId", group.id);
    const newCopy = await doFetchRequest({
      method: "PUT",
      url: "/database/duplicateDatabase",
      token,
      data: {
        databaseId,
        workgroupId: selectedGroupId,
        databaseGroupId: group.id,
      },
    });
    if (newCopy) {
      window.location.reload();
    }
  };

  return (
    <div className={styles.projectGrid}>
      {group
        ? group?.databases?.map((_project: any) => (
            <div key={_project.id}>
              <ProjectPreview
                name={_project.name}
                imageSrc={_project.imageSrc}
                fav={_project.fav}
                lastEdit={_project.updated_at}
                Open={() => router.push(`/canvas/${_project.id}`)}
                Duplicate={() => handleDuplicateDatabase(_project.id)}
              />
            </div>
          ))
        : ""}
    </div>
  );
};

export default ProjectGrid;
