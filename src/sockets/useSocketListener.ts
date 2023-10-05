import { useEffect } from 'react';
import { useAddTableNode } from '../hooks/useAddTableNode';
import { socket } from './socketConnection';

export const useSocketListeners = () => {
  const { getSocketTable } = useAddTableNode();

  if (!socket) return;
  console.log(socket)

  const handleResponseCreateTable = (data: any) => {
    console.log("Received responseCreateTable:", data.table);
    getSocketTable(data.table);
  };

  // socket.on("responseCreateTable", () => console.log("pute"));
  socket.on("responseCreateTable", (data) => handleResponseCreateTable(data));
    
};
