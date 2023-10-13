import { Table } from "@/types/tables";
import { socket } from '../components/Canvas/CanvasElement';

export const addTableSocket = (table: Table) => {
  socket.emit("requestCreateTable", table);
};

export const deleteTableSocket = (tableName: string) => {
  socket.emit("requestDeleteTable", tableName);
}

export const updateTableNameSocket = (tableName: string, newTableName: string) => {
  socket.emit("requestUpdateTableName", { tableName: tableName, newTableName: newTableName });
}
