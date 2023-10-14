import { Field, Relation, Table } from "@/types/tables";
import { socket } from '../components/Canvas/CanvasElement';

///// Tables /////
export const addTableSocket = (table: Table) => {
  socket.emit("requestCreateTable", table);
}

export const deleteTableSocket = (tableName: string) => {
  socket.emit("requestDeleteTable", tableName);
}

export const updateTableNameSocket = (tableName: string, newTableName: string) => {
  socket.emit("requestUpdateTableName", { tableName: tableName, newTableName: newTableName });
}

export const moveTableSocket = (tableName: string, posX: number, posY: number) => {
  socket.emit("requestMoveTable", { tableName: tableName, posX: posX, posY: posY });
}

///// Fields /////
export const addFieldSocket = (field: Field, tableName: string) => {
  socket.emit("requestCreateField", { field: field, tableName: tableName });
}

export const updateFieldSocket = (tableName: string, fieldName: string, data: Field) => {
  socket.emit("requestUpdateField", { tableName: tableName, fieldName: fieldName, field: data });
}

export const deleteFieldSocket = (tableName: string, fieldName: string) => {
  socket.emit("requestDeleteField", { tableName: tableName, fieldName: fieldName });
}

///// Edges /////
export const addEdgeSocket = (relation: Relation) => {
  socket.emit("requestCreateEdge", relation);
}

export const deleteEdgeSocket = (relation: Relation) => {
  socket.emit("requestDeleteEdge", relation);
}
