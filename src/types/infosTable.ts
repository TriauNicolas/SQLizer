import { DataTable } from "./tables";

export type InfosTableType = {
  tableParent: {
    id: string | undefined | null | '';
    data: DataTable;
  };
  fieldsChildren: Node[];
}