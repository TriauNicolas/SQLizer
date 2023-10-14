import { Field, Table } from "./tables"

///// TABLE /////
export type ResponseCreateTableEvent = {
    table: Table;
}

export type ResponseUpdateTableNameEvent = {
    tableName: string;
    newTableName: string;
}

export type ResponseDeleteTableEvent = {
    tableName: string;
}

export type ResponseMoveTableEvent = {
    tableName: string;
    posX: number;
    posY: number;
}

///// FIELDS /////
export type ResponseCreateFieldEvent = {
    tableName: string;
    field: Field;
}

export type ResponseUpdateFieldEvent = {
    tableName: string;
    fieldName: string;
    field: Field;
}

export type ResponseDeleteFieldEvent = {
    tableName: string;
    fieldName: string;
}
