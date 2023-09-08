export type Relation = {
  from: From;
  to: To;
  positionsFrom?: PositionsFrom;
  positionsTo?: PositionsTo;
}

export type From = {
  table: string;
  field: string;
}

export type To = {
  table: string;
  field: string;
}

export type PositionsFrom = {
  posX: number;
  posY: number;
  indexField: number;
}

export type PositionsTo = {
  posX: number;
  posY: number;
  indexField: number;
}