"use client";
import styles from "./Sidebar.module.scss";
import { Key, useState } from "react";

// Images
import GroupIcon from "../Icons/GroupIcon";
import CheckmarkIcon from "../Icons/CheckmarkIcon";
import DropdownArrow from "../Icons/DropdownArrow";
import EditIcon from "../Icons/EditIcon";
import FavIcon from "../Icons/FavIcon";
import MentionIcon from "../Icons/MentionIcon";
import PersonIcon from "../Icons/PersonIcon";

// Dummy Data
// TODO: Temporary groups, Load true data
import { groups } from "@/dummiesData/groups";
import CreateGroupButton from "../CreateGroupButton/CreateGroupButton";

const SideBar = () => {
  const [showGroups, setShowGroups] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
            <ul
              className={`${styles.dropdown} ${
                groups.length > 5 && styles.overflow
              }`}
            >
              {groups.map((_group: any, _key: Key) => {
                return (
                  <li className={styles.link} key={_key}>
                    {_group.name}
                  </li>
                );
              })}
            </ul>
          </li>
          <li className={styles.link}>
            <div className={styles.linkSubContainer}>
              <span className={styles.svgContainer}>
                <PersonIcon />
              </span>
              <p>Assigned to me</p>
            </div>
          </li>
          <li className={styles.link}>
            <div className={styles.linkSubContainer}>
              <span className={styles.svgContainer}>
                <MentionIcon />
              </span>
              <p>Mentioned</p>
            </div>
          </li>
          <li className={styles.link}>
            <div className={styles.linkSubContainer}>
              <span className={styles.svgContainer}>
                <FavIcon />
              </span>
              <p>Favorites</p>
            </div>
          </li>
          <li className={styles.link}>
            <div className={styles.linkSubContainer}>
              <span className={styles.svgContainer}>
                <CheckmarkIcon />
              </span>
              <p>Closed</p>
            </div>
          </li>
          <li className={styles.link}>
            <div className={styles.linkSubContainer}>
              <span className={styles.svgContainer}>
                <EditIcon />
              </span>
              <p>Draft</p>
            </div>
          </li>
        </ul>
        <CreateGroupButton />
      </div>

      <span className={styles.separator}></span>
    </div>
  );
};

export default SideBar;
