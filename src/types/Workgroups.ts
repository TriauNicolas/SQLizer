import { DatabasesGroups } from "./DatabasesGroups";
import { User } from "./User";
import { UsersWorkgroups } from "./UsersWorkgroups";

export interface Workgroups {
  id: string;
  group_name: string;
  created_at?: Date;
  creator_id: string;
  databases_groups: DatabasesGroups[];
  users_workgroups: UsersWorkgroups[];
  users: User;
  private: boolean;
}