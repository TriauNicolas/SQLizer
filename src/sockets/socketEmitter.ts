import { Table } from "@/types/tables";
import { socket } from '../components/Canvas/CanvasElement';

export const addTableSocket = (table: Table) => {
  socket.emit("requestCreateTable", table);
};
