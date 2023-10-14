import { Field } from "./tables";

export type InfosTableType = {
  tableParent: {
    id: string | undefined | null | '';
    data: Field;
  };
  fieldsChildren: Node[];
}