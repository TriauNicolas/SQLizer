
import { useEffect, useState } from "react";
import style from "./Workgroups.module.scss";
import Image from 'next/image';
import UserWorkgroups from "../UserWorkgroups/UserWorkgroups";
import { doFetchRequest } from "@/api/fetch";
import add from '../../../public/SVGAddField.svg'
import { useSession } from "next-auth/react";

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
  users?: User[],
}

interface User {
  user_id: string,
  first_name: string,
  last_name: string,
  email: string,
  rights: Rights,
}

interface Props {
  group: Workgroups,
  token: string,
  initialUserEmail?: string 
  status: string, 
}


const Workgroups = ({group, token, initialUserEmail, status}:Props) => {
  
  const [ workgroups, setWorkgroups ] = useState<Workgroups[]>();
  const [ selectedGroup, setSelectedGroup ] = useState<string | null>(null);
  const [ newUserEmail, setNewUserEmail ] = useState('');

  const handleDeleteGroup = ( groupId:string ) => {
    const updatedGroups = workgroups?.filter((group:Workgroups) => group.group_id !== groupId);
    setWorkgroups(updatedGroups);
  };

  const handleSelectGroup = (groupId: string) => {
    setSelectedGroup(groupId);
  };

  const handleAddUserToGroup = async ( groupId: string ) => {
    const newUser = await doFetchRequest({method: 'PUT', url: '/workgroups/addUserToWorkgroup', token: token, data: {email: newUserEmail, groupId, update_right: true}})

    setNewUserEmail('');
  };

  useEffect(() => {
    // Define handleAddUserToGroup function
    const handleAddUserToGroup = async (groupId: string) => {
      const newUser = await doFetchRequest({method: 'PUT', url: '/workgroups/addUserToWorkgroup', token, data: {email: newUserEmail, groupId, update_right: true}})

      setNewUserEmail('');
    };
  }, [ newUserEmail, status ])

  return (
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
                  value={newUserEmail}
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
            {group?.users?.map((user:User, index) => (
              <UserWorkgroups key={index} users={user} group={group} token={token}  initialUserEmail={initialUserEmail}/>
            ))}
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Workgroups;
