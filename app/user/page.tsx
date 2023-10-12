"use client"

import React, { useState } from "react"
import "@/styles/user.css"
import { useRouter } from "next/navigation"


const User = () => {
  const router = useRouter()

  interface Rights {
    create_right: boolean;
    update_right: boolean;
    delete_right: boolean;
  }

  const fakeUser = {
    email: 'robinpinon1@gmail.com',
    first_name: 'robin',
    last_name: 'pinon',
  }

  const fakeGroups = [
    {
      id: 1,
      grpName: 'Group 1',
      isAdmin: true,
      rights: {
        create_right: true,
        update_right: true,
        delete_right: false,
      },
      users: [
        {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          email: 'john@example.com',
          rights: {
            create_right: true,
            update_right: false,
            delete_right: false,
          },
        },
        {
          id: 2,
          first_name: 'John',
          last_name: 'Doe',
          email: 'Doe@example.com',
          rights: {
            create_right: true,
            update_right: false,
            delete_right: false,
          },
        },
      ],
    },
    {
      id: 2,
      grpName: 'Group 2',
      isAdmin: false,
      rights: {
        create_right: false,
        update_right: false,
        delete_right: false,
      },
      users: [],
    },
  ];

  const [groups, setGroups] = useState(fakeGroups);
  const [newUserEmail, setNewUserEmail] = useState('');

  const handleDeleteGroup = (groupId:number) => {
    const updatedGroups = groups.filter((group) => group.id !== groupId);
    setGroups(updatedGroups);
  };

  const addUserToGroup = (groupId:number, newUser:any) => {
    // Find the group by its ID
    const groupIndex = groups.findIndex((group) => group.id === groupId);
  
    if (groupIndex !== -1) {
      // Update the group's user list with the new user
      const updatedGroup = { ...groups[groupIndex] };
      updatedGroup.users = [...updatedGroup.users, newUser];
  
      // Update the groups array in the state
      const updatedGroups = [...groups];
      updatedGroups[groupIndex] = updatedGroup;
  
      // Set the updated groups array in the state
      setGroups(updatedGroups);
    }
  };

  const handleAddUserToGroup = (groupId: number) => {
    // Create a new user object (you can replace this with real user data)
    const newUser = {
      first_name: 'New',
      last_name: 'User',
      email: newUserEmail,
      rights: {
        create_right: true,
        update_right: true,
        delete_right: false,
      },
    };
  
    // Call the new function to add the user to the group
    addUserToGroup(groupId, newUser);
  
    // Clear the input field after adding the user
    setNewUserEmail('');
  };

  const handleDeleteUserFromGroup = (groupId:number, userEmail:string) => {
    const groupIndex = groups.findIndex((group) => group.id === groupId);

    if (groupIndex !== -1) {
      const updatedGroup = { ...groups[groupIndex] };
      updatedGroup.users = updatedGroup.users.filter(
        (user) => user.email !== userEmail
      );

      const updatedGroups = [...groups];
      updatedGroups[groupIndex] = updatedGroup;

      setGroups(updatedGroups);
    }
  };

  const handleToggleRight = (groupId: number, userEmail: string, rightName: keyof Rights) => {
    const groupIndex = groups.findIndex((group) => group.id === groupId);

    if (groupIndex !== -1) {
      const updatedGroup = { ...groups[groupIndex] };
      const userIndex = updatedGroup.users.findIndex(
        (user) => user.email === userEmail
      );

      if (userIndex !== -1) {
        updatedGroup.users[userIndex].rights[rightName] = !updatedGroup.users[userIndex].rights[rightName];

        const updatedGroups = [...groups];
        updatedGroups[groupIndex] = updatedGroup;

        setGroups(updatedGroups);
      }
    }
  };

  return (
    <div className="container">
      <h1>Profil utilisateur de : {fakeUser.first_name} {fakeUser.last_name}</h1>
      <h2>Mes groupes</h2>
      <div className="groups">
        {groups.map((group) => (
          <div key={group.id}>
            <h2>Group Information</h2>
            {!group.isAdmin && (
              <div className="groups__notAdmin">
                <p>Group Name: {group.grpName}</p>
                <button onClick={() => handleDeleteGroup(group.id)}>Quitter le groupe</button>
              </div>
            )}
            {group.isAdmin && (
              <div>
                <div className="groups__isAdmin">
                  <p>Group Name: {group.grpName}</p>
                  <div>
                    <input
                      type="email"
                      placeholder="Enter user's email"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                    />
                    <button onClick={() => handleAddUserToGroup(group.id)}>Add User</button>
                  </div>
                </div>
                <div className="users">
                  {group.users.map((user, index) => (
                    <div className="user">
                      <div key={user.id} className="user__inGroups">
                        <p>Email: {user.email}</p>
                        <p>Create Right: {user.rights.create_right ? 'Yes' : 'No'}</p>
                        <button
                          onClick={() =>
                            handleToggleRight(
                              group.id,
                              user.email,
                              'create_right'
                            )
                          }
                        >
                          Toggle Create Right
                        </button>
                        <p>Update right: {user.rights.update_right ? 'Yes' : 'No'}</p>
                        <button
                          onClick={() =>
                            handleToggleRight(
                              group.id,
                              user.email,
                              'update_right'
                            )
                          }
                        >
                          Toggle Update right
                        </button>
                        <p>Delete Right: {user.rights.delete_right ? 'Yes' : 'No'}</p>
                        <button
                          onClick={() =>
                            handleToggleRight(
                              group.id,
                              user.email,
                              'delete_right'
                            )
                          }
                        >
                          Toggle Delete Right
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteUserFromGroup(group.id, user.email)
                          }
                        >
                          Expulser
                        </button>
                      </div>
                      
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