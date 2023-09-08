export type TableElement = {
  name: string;
  posX: number;
  posY: number;
  fields: Field[]
}

export type Field = {
  name: string;
  type: string;
  nullable: boolean;
  pk?: boolean;
  fk?: boolean;
  defaultValue?: string;
}