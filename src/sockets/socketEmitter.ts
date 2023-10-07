import { Table } from "@/types/tables";
import { socket } from '../components/Canvas/CanvasElement';

export const addTableSocket = (table: Table) => {
  console.log(table)
  socket?.emit("requestCreateTable", table);
};
