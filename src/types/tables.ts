export type ConvertedData = {
  dbName: string;
  tables: Table[];
  relations: []
}

export type Table = {
  name: string;
  posX: number;
  posY: number;
  fields: Field[]
}

export type Field = {
  title: string;
  name: string;
  type: string;
  default: string;
  autoIncrement: boolean;
  pk: boolean;
  nullable: boolean;
}
