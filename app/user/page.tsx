"use client"

import React, { useState, useEffect, use } from "react"
import Image from 'next/image';
import logo from '../../public/logosqlizerwhite.svg';
import add from '../../public/SVGAddField.svg'
import style from "../../src/styles/user.module.css"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { doFetchRequest } from "@/api/fetch"
import { session } from "../SessionProvider"

interface Data {
  success: boolean,
  groups: Workgroups[]
}

interface Rights {
  create_right: boolean;
  update_right: boolean;
  delete_right: boolean;
}

interface Workgroups {
  group_id: string,
  group_name: string,
  rights: Rights,
  is_admin: boolean,
  users?: {
    user_id: string,
    first_name: string,
    last_name: string,
    email: string,
    rights: Rights,
  }[],
}

interface UserType {
  first_name: string,
  last_name: string,
  email: string,
}

const User = () => {
  const { data: session, status } = useSession();

  console.log(useSession())

  const [ workgroups, setWorkgroups ] = useState<Workgroups[]>();
  const [ data, setData ] = useState<Data>();
  const [ token, setToken ] = useState("");
  const [ user, setUser ] = useState<UserType>();
  const [ newUserEmail, setNewUserEmail ] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  
  useEffect(() => {
    if (status === 'authenticated') {
      // @ts-ignore
      setToken(session?.user?.token)
      setUser({
        // @ts-ignore
        first_name: session?.user?.firstName,
        // @ts-ignore
        last_name: session?.user?.lastName,
        // @ts-ignore
        email: session?.user?.email
      })
      const getData = async() => {
        // @ts-ignore
        return await doFetchRequest({method:"GET", token: session?.user?.token, url:"/workgroups/getUserWorkgroupsDatas"})
      }

      getData().then((response) => {
        setData(response)
      })
      .catch((error) => {
        console.log(error)
      });
    }
  }, [status, session]);

  useEffect(() => {
    if (!data) return
    setWorkgroups(data.groups)
  }, [data])

  useEffect(() => {
    if (!workgroups) return
  }, [workgroups])

  const handleDeleteGroup = (groupId:string) => {
    const updatedGroups = workgroups?.filter((group:Workgroups) => group.group_id !== groupId);
    setWorkgroups(updatedGroups);
  };
  

  const handleAddUserToGroup = async (groupId: string) => {
    const newUser = await doFetchRequest({method: 'PUT', url: '/workgroups/addUserToWorkgroup', token, data: {email: newUserEmail, groupId, update_right: true}})
    console.log(newUser);
    setNewUserEmail('');
  };

  const handleDeleteUserFromGroup = async (groupId: string, userId: string) => {
    // TODO : Link with back
  };
  

  const handleToggleRight = async (groupId: string, userEmail: string, rightName: keyof Rights) => {
    // TODO : Link with back
  };

  const handleSelectGroup = (groupId: string) => {
    setSelectedGroup(groupId);
  };

  return (
    <div className={style.container}>
      <div className={style.userMainTitle}>
        <Image 
            src={logo}
            height={80}
            width={87}
            alt="logo Sqilizer"
            priority
        />
        <h1>Bienvenue {user?.first_name} {user?.last_name}</h1>
      </div>
      <div className={style.groups}>
        <h2>Mes Groupes:</h2>
        {workgroups?.map((group:Workgroups) => (
          <div className={style.groupsDiv} key={group.group_id}>
            <h3>Group Information</h3>
            {!group.is_admin && (
              <div className={style.groups__notAdmin}>
                <p>Group Name: {group.group_name}</p>
                <div className={style.userGroupRemove}>
                  <button className={style.UserGroupRemoveButton}onClick={() => handleDeleteGroup(group.group_id)}>Quitter</button>
                </div>
              </div>
            )}
            {group.is_admin && (
              <div className={style.groupsDiv}>
                <div className={style.groups__isAdmin}>
                  <p>Group Name: {group.group_name}</p>
                  {group.group_name !== 'Mes Projets' && (
                    <div className={style.userGroupAdd}>
                      <button className="SelectedGroup" onClick={() => handleSelectGroup(group.group_id)}>AddUser</button>
                    </div>
                  )}
                  {selectedGroup === group.group_id && (
                    <div className={style.userGroupAddForm}>
                      <input
                        type="email"
                        placeholder="Enter user's email"
                        value={newUserEmail} // Set the value based on newUserEmail
                        onChange={(e) => setNewUserEmail(e.target.value)}
                      />
                      <Image 
                        src={add}
                        height={39}
                        width={39}
                        alt="logo Sqilizer"
                        priority
                        className={style.userGroupAddFormImage}
                        onClick={() => handleAddUserToGroup(group.group_id)}
                      />
                    </div>
                  )}
                </div>
                <div className={style.users}>
                  {group?.users?.map((users, index) => (
                    <div className="user" key={index}>
                      {users.email != user?.email && (
                        <div className={style.user__inGroups}>
                          <p>Email: <strong>{users.email}</strong></p>
                          <div className={style.userGroupToggle}>
                            <p>Create Right: <strong>{users.rights.create_right ? 'Yes' : 'No'}</strong></p>
                            <div className={style.userGroupToggleButton}>
                              <input
                              className={style.userGroupToggleButtonInput}
                                type="checkbox"
                                onClick={() =>
                                  handleToggleRight(
                                    group.group_id,
                                    users.email,
                                    'create_right'
                                  )
                                }
                              />
                              <span 
                              className={style.userGroupToggleButtonSpan}></span>
                            </div>
                          </div>
                          <div className={style.userGroupToggle}>
                            <p>Update right: <strong>{users.rights.update_right ? 'Yes' : 'No'}</strong></p>
                            <div className={style.userGroupToggleButton}>
                              <input
                              className={style.userGroupToggleButtonInput}
                                type="checkbox"
                                onClick={() =>
                                  handleToggleRight(
                                    group.group_id,
                                    users.email,
                                    'update_right'
                                  )
                                }
                              />
                              <span 
                              className={style.userGroupToggleButtonSpan}></span>
                            </div>
                          </div>
                          <div className={style.userGroupToggle}>
                            <p>Delete Right: <strong>{users.rights.delete_right ? 'Yes' : 'No'}</strong></p>
                            <div className={style.userGroupToggleButton}>
                              <input
                              className={style.userGroupToggleButtonInput}
                                type="checkbox"
                                onClick={() =>
                                  handleToggleRight(
                                    group.group_id,
                                    users.email,
                                    'delete_right'
                                  )
                                }
                              />
                              <span 
                              className={style.userGroupToggleButtonSpan}></span>
                            </div>
                          </div>
                          <div className={style.userGroupRemove}>
                            <button
                              className={style.UserGroupRemoveButton}
                                onClick={() =>
                                  handleDeleteUserFromGroup(group.group_id, users.user_id)
                                }
                              >
                                Expulser
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default User