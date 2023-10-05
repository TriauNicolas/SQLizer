import { Table } from "@/types/tables";
import { socket } from './socketConnection';

export const addTableSocket = (table: Table) => {
  console.log(table)
  socket.emit("requestCreateTable", table);
};
