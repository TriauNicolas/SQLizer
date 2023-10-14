import { Workgroups } from "./Workgroups";

export interface DatabasesGroups {
  id: string;
  workgroup_id: string;
  delete_interval?: bigint;
  workgroups: Workgroups;
}