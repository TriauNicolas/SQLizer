"use client"

import React, { useState, useEffect, use } from "react"
import "@/styles/user.css"
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
    <div className="container">
      <h1>Profil utilisateur de : {user?.first_name} {user?.last_name}</h1>
      <h2>Mes groupes</h2>
      <div className="groups">
        {workgroups?.map((group:Workgroups) => (
          <div key={group.group_id}>
            <h2>Group Information</h2>
            {!group.is_admin && (
              <div className="groups__notAdmin">
                <p>Group Name: {group.group_name}</p>
                <button onClick={() => handleDeleteGroup(group.group_id)}>Quitter le groupe</button>
              </div>
            )}
            {group.is_admin && (
              <div>
                <div className="groups__isAdmin">
                  <p>Group Name: {group.group_name}</p>
                  {group.group_name !== 'Mes Projets' && (
                    <div>
                      <button className="SelectedGroup" onClick={() => handleSelectGroup(group.group_id)}>AddUser</button>
                    </div>
                  )}
                  {selectedGroup === group.group_id && (
                    <div>
                      <input
                        type="email"
                        placeholder="Enter user's email"
                        value={newUserEmail} // Set the value based on newUserEmail
                        onChange={(e) => setNewUserEmail(e.target.value)}
                      />
                      <button onClick={() => handleAddUserToGroup(group.group_id)}>Add User</button>
                    </div>
                  )}
                </div>
                <div className="users">
                  {group?.users?.map((users, index) => (
                    <div className="user" key={index}>
                      {users.email != user?.email && (
                        <div className="user__inGroups">
                          <p>Email: {users.email}</p>
                          <p>Create Right: {users.rights.create_right ? 'Yes' : 'No'}</p>
                          <button
                            onClick={() =>
                              handleToggleRight(
                                group.group_id,
                                users.email,
                                'create_right'
                              )
                            }
                          >
                            Toggle Create Right
                          </button>
                          <p>Update right: {users.rights.update_right ? 'Yes' : 'No'}</p>
                          <button
                            onClick={() =>
                              handleToggleRight(
                                group.group_id,
                                users.email,
                                'update_right'
                              )
                            }
                          >
                            Toggle Update right
                          </button>
                          <p>Delete Right: {users.rights.delete_right ? 'Yes' : 'No'}</p>
                          <button
                            onClick={() =>
                              handleToggleRight(
                                group.group_id,
                                users.email,
                                'delete_right'
                              )
                            }
                          >
                            Toggle Delete Right
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteUserFromGroup(group.group_id, users.user_id)
                            }
                          >
                            Expulser
                          </button>
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