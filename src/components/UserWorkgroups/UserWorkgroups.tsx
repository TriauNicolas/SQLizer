import { useEffect, useState } from "react";
import style from "./UserWorkgroups.module.scss";
import { doFetchRequest } from "@/api/fetch";

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
  users: User,
  group: Workgroups,
  token: string,
  initialUserEmail?: string 
}

const UserWorkgroups = ({users, group, token, initialUserEmail}: Props) => {
  const [ toggleCreateRight, setToggleCreateRight ] = useState(users.rights.create_right);
  const [ toggleUpdateRight, setToggleUpdateRight ] = useState(users.rights.update_right);
  const [ toggleDeleteRight, setToggleDeleteRight ] = useState(users.rights.delete_right);

  const handleToggleRight = async (
    userId: string,
    groupId: string,
    rightName: keyof Rights
  ): Promise<boolean> => {
    
    try {
      let url = '';

      let rightBool: boolean;

      switch (rightName) {
        case 'create_right':
          url = '/workgroups/updateUserCreateRight';
          setToggleCreateRight(!toggleCreateRight)
          rightBool = toggleCreateRight
          break;
        case 'delete_right':
          url = '/workgroups/updateUserDeleteRight';
          setToggleDeleteRight(!toggleDeleteRight)
          rightBool = toggleDeleteRight
          break;
        case 'update_right':
          url = '/workgroups/updateUserUpdateRight';
          setToggleUpdateRight(!toggleUpdateRight)
          rightBool = toggleUpdateRight
          break;
        default:
          console.error('Invalid rightName:', rightName);
          return false;
      }
  
      const response = await doFetchRequest({
        method: 'PUT',
        url,
        token: token,
        data: { userId, groupId, [rightName]:!rightBool },
      });
  
      if (response.success) {
        console.log('User right:' + rightName + ' has been updated', response);
        return true; // Return true for a successful update
      } else {
        console.error('Error updating user rights 1:', response.error);
        return false; // Return false for an unsuccessful update
      }
    } catch (error) {
      console.error('Error updating user rights 2:', error);
      return false; // Return false for errors
    }
  };

  
  const handleDeleteUserFromGroup = async ( userId: string, groupId: string) => {
    try {
      const response = await doFetchRequest({ method: 'DELETE', url: '/workgroups/removeUserOfWorkgroup', token: token, data: { userId, groupId },});
      if (response.success) {
        console.log('User removed from the group:', response);
      } else {
        console.error('Error removing user from the group:', response.error);
      }
    } catch (error) {
      console.error('Error removing user from the group:', error);
    }
  };

  return (
    <div className={style.usersGroup}>
      {users.email != initialUserEmail && (
        <div className={style.user__inGroups}>
          <p>Email: <strong>{users.email}</strong></p>
          <div className={style.userGroupToggle}>
            <p>Create Right: <strong>{toggleCreateRight ? 'Yes' : 'No'}</strong></p>
            <div className={style.userGroupToggleButton}>
              <input
              className={style.userGroupToggleButtonInput}
                type="checkbox"
                onClick={() =>
                  handleToggleRight(
                    users.user_id,
                    group.group_id,
                    'create_right'
                  )
                }
                onChange={() => {

                }}
                checked={toggleCreateRight}
              />
              <span 
              className={style.userGroupToggleButtonSpan}></span>
            </div>
          </div>
          <div className={style.userGroupToggle}>
            <p>Update right: <strong>{toggleUpdateRight ? 'Yes' : 'No'}</strong></p>
            <div className={style.userGroupToggleButton}>
              <input
                className={style.userGroupToggleButtonInput}
                type="checkbox"
                onClick={() =>
                  handleToggleRight(
                    users.user_id,
                    group.group_id,
                    'update_right'
                  )
                }
                onChange={() => {

                }}
                checked={toggleUpdateRight}
              />
              <span 
              className={style.userGroupToggleButtonSpan}></span>
            </div>
          </div>
          <div className={style.userGroupToggle}>
            <p>Delete Right: <strong>{toggleDeleteRight ? 'Yes' : 'No'}</strong></p>
            <div className={style.userGroupToggleButton}>
              <input
                className={style.userGroupToggleButtonInput}
                type="checkbox"
                onClick={() =>
                  handleToggleRight(
                    users.user_id,
                    group.group_id,
                    'delete_right'
                  )
                }
                onChange={() => {

                }}
                checked={toggleDeleteRight}
              />
              <span 
              className={style.userGroupToggleButtonSpan}></span>
            </div>
          </div>
          <div className={style.userGroupRemove}>
            <button
              className={style.UserGroupRemoveButton}
                onClick={() =>
                  handleDeleteUserFromGroup( users.user_id, group.group_id )
                }
              >
                Expulser
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserWorkgroups;