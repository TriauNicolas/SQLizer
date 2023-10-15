import Image from "next/image";
import styles from "./UserTable.module.scss";

// TODO: Fake Data, use true data
import { User } from "@/types/User";

interface Props {
  users: User[];
}
const UserTable = ({ users }: Props) => {
  return (
    <></>
    // <table className={styles.teammatesTable}>
    //   <thead>
    //     <tr>
    //       <th className="bold">Teammates</th>
    //       <th className="bold">Current projects in common</th>
    //       <th className="bold">Closed projects in common</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {users.map((teammate) => (
    //       <tr key={teammate.id}>
    //         <td>
    //           <div className={styles.picWrapper}>
    //             <Image
    //               src={teammate.pic}
    //               alt={teammate.firstName}
    //               width={36}
    //               height={36}
    //             />
    //             <span>
    //               {teammate.firstName} {teammate.lastName}
    //             </span>
    //           </div>
    //         </td>
    //         <td>{teammate.currentProjects}</td>
    //         <td>{teammate.closedProjects}</td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
  );
};

export default UserTable;
