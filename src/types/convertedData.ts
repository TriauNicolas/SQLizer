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
  name: string;
  type: string;
  autoIncrement?: boolean;
  pk?: boolean;
  fk?: boolean;
  nullable?: boolean;
}