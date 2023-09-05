export type DrawnElement = {
  type: string;
  name: string;
  posX: number;
  posY: number;
  fields: Field[]
}

export type Field = {
  name: string;
  type: string;
  primaryKey?: boolean;
}