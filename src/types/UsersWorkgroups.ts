import { User } from "./User";
import { Workgroups } from "./Workgroups";

export interface UsersWorkgroups {
  user_id: string;
  group_id: string;
  create_right: boolean;
  update_right: boolean;
  delete_right: boolean;
  workgroups: Workgroups;
  users: User;
}