export type ConvertedData = {
  dbName: string;
  tables: Table[];
  relations: []
}

export type Table = {
  name: string;
  posX: number;
  posY: number;
  fields: DataTable[]
}

export type DataTable = {
  title: string;
  name: string;
  type: string;
  default?: string;
  autoIncrement?: boolean;
  pk?: boolean;
  fk?: boolean;
  nullable?: boolean;
}