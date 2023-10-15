"use client";
import styles from "./Sidebar.module.scss";
import { Key, useContext, useEffect, useState } from "react";

// Images
import GroupIcon from "../Icons/GroupIcon";
import CheckmarkIcon from "../Icons/CheckmarkIcon";
import DropdownArrow from "../Icons/DropdownArrow";
import EditIcon from "../Icons/EditIcon";
import FavIcon from "../Icons/FavIcon";
import MentionIcon from "../Icons/MentionIcon";
import PersonIcon from "../Icons/PersonIcon";
import CreateGroupButton from "../CreateGroupButton/CreateGroupButton";
import { DashboardContext } from "../../../app/dashboard/layout";
import { doFetchRequest } from "@/api/fetch";
import CrossIcon from "../Icons/CrossIcon";

const SideBar = () => {
  const [showGroups, setShowGroups] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);
  const [groupName, setGroupName] = useState("");

  const { token, data, setData, selectedGroupId, setSelectedGroupId } =
    useContext(DashboardContext);

  const handleDeleteWorkGroup = async (group_id: string) => {
    try {
      const deletedWorkGroup = await doFetchRequest({
        method: "DELETE",
        url: "/workgroups/deleteWorkgroup",
        token,
        data: {
          group_id,
        },
      });

      if (deletedWorkGroup && deletedWorkGroup.success) {
        const updatedGroups = data.workgroups.filter(
          (group: { group_id: string }) => group.group_id !== group_id
        );
        setData((prevData: any) => ({
          ...prevData,
          workgroups: updatedGroups,
        }));
        window.location.reload();
      }
    } catch (error) {
      console.error(`Error deleting group: ${group_id}`, error);
    }
  };
  const handleCreateWorkGroup = async (group_name: string) => {
    try {
      const newWorkGroup = await doFetchRequest({
        method: "POST",
        url: "/workgroups/createWorkgroup",
        token,
        data: {
          group_name,
        },
      });
      window.location.reload();
      if (newWorkGroup) {
        console.log("AHHA", newWorkGroup);
        const updatedGroups = [...data.workgroups, newWorkGroup];
        setData((prevData: any) => ({
          ...prevData,
          workgroups: updatedGroups,
        }));
        setGroupName("");
      }
    } catch (error) {
      console.error(`Error creating new group: ${group_name}`, error);
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h2 className="h2 bold">SQLizer</h2>
        <button
          className={`${styles.hamburger} ${menuOpen && styles.active}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </button>
      </div>
      <div className={`${styles.menuContainer} ${menuOpen && styles.open}`}>
        <h3 className="callout semiBold">Projects</h3>
        <ul className={`body ${styles.menu} ${menuOpen && styles.open}`}>
          <li
            onClick={() => setShowGroups(!showGroups)}
            className={`${showGroups && styles.showGroups}`}
          >
            <span className={styles.link}>
              <div className={styles.linkSubContainer}>
                <span className={styles.svgContainer}>
                  <GroupIcon />
                </span>
                <p>Groups</p>
              </div>
              <span
                style={{
                  transform: showGroups ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <DropdownArrow />
              </span>
            </span>
            <ul className={`${styles.dropdown}`}>
              {data.workgroups.map((_group: any, _key: Key) => {
                return (
                  <li
                    onClick={() => {
                      setSelectedGroupId(_group.workgroups.id);
                    }}
                    className={`${styles.link} ${
                      _group.group_id === selectedGroupId && styles.selected
                    }`}
                    key={_key}
                  >
                    {_group?.workgroups?.group_name
                      ? _group.workgroups.group_name
                      : "New Group ..."}
                    {_group.delete_right && (
                      <span
                        style={{ display: "flex" }}
                        onClick={() => handleDeleteWorkGroup(_group.group_id)}
                      >
                        <CrossIcon />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </li>
          <li className={`${styles.link} ${styles.upcoming}`}>
            <div className={styles.linkSubContainer}>
              <span className={styles.svgContainer}>
                <PersonIcon />
              </span>
              <p>Assigned to me</p>
            </div>
          </li>
          <li className={`${styles.link} ${styles.upcoming}`}>
            <div className={styles.linkSubContainer}>
              <span className={styles.svgContainer}>
                <MentionIcon />
              </span>
              <p>Mentioned</p>
            </div>
          </li>
          <li className={`${styles.link} ${styles.upcoming}`}>
            <div className={styles.linkSubContainer}>
              <span className={styles.svgContainer}>
                <FavIcon />
              </span>
              <p>Favorites</p>
            </div>
          </li>
          <li className={`${styles.link} ${styles.upcoming}`}>
            <div className={styles.linkSubContainer}>
              <span className={styles.svgContainer}>
                <CheckmarkIcon />
              </span>
              <p>Closed</p>
            </div>
          </li>
          <li className={`${styles.link} ${styles.upcoming}`}>
            <div className={styles.linkSubContainer}>
              <span className={styles.svgContainer}>
                <EditIcon />
              </span>
              <p>Draft</p>
            </div>
          </li>
        </ul>
        <input
          type="text"
          value={groupName}
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
          placeholder="Enter workgroup name"
          className={styles.groupInput}
        />
        <CreateGroupButton
          active={groupName !== ""}
          OnClick={() => handleCreateWorkGroup(groupName)}
        />
      </div>

      <span className={styles.separator}></span>
    </div>
  );
};

export default SideBar;
