import { useState, useCallback, useRef } from 'react';
import { Edge, OnEdgesChange, applyEdgeChanges, Connection, OnConnect, updateEdge, addEdge, useReactFlow} from 'reactflow';
import { addEdgeSocket, deleteEdgeSocket } from '@/sockets/socketEmitter';

// const initialEdges = [{ id: 'Users.2-UsersGroup.3', source: '2', target: '4', animated: true }];

export const useEdges = () => {
  const [ edges, setEdges ] = useState<Edge[]>([]);
  const edgeUpdateSuccessful = useRef(true);
  const { getNode } = useReactFlow();

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onEdgeUpdate = useCallback((oldEdge: Edge, newConnection: Connection) => {
    edgeUpdateSuccessful.current = true;

    // Delete socket infos & call
    const oldInfosFrom = (oldEdge.id).split('-')[0];
    const oldTableNameFrom = oldInfosFrom.split('.')[0];
    const oldFieldNameFrom = getNode(oldTableNameFrom.split('.')[1])?.data.name;

    const oldInfosTo = (oldEdge.id).split('-')[1];
    const oldTableNameTo = oldInfosTo.split('.')[0];
    const oldFieldNameTo = getNode(oldTableNameTo.split('.')[1])?.data.name;
    
    deleteEdgeSocket({ from: { table: oldTableNameFrom, field: oldFieldNameFrom }, to: { table: oldTableNameTo, field: oldFieldNameTo } })
    
    // Add socket infos & call
    if (newConnection.source && newConnection.target) {
      const nodeFrom = getNode(newConnection.source);
      const nodeTo = getNode(newConnection.target);

      addEdgeSocket({ from: { table: (nodeFrom?.data.title).split('.')[0], field: nodeFrom?.data.name }, to: { table: (nodeTo?.data.title).split('.')[0], field: nodeTo?.data.name } })
    }

    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, [getNode]);

  const onEdgeUpdateEnd = useCallback((_: any, edge: Edge) => {
    if (!edgeUpdateSuccessful.current) {
    const infosFrom = edge.source;
    const currentNodeFrom = getNode(infosFrom);
    const tableNameFrom = (currentNodeFrom?.data.title).split('.')[0];
    const fieldNameFrom = (currentNodeFrom?.data.title).split('.')[1];

    const infosTo = edge.target;
    const currentNodeTo = getNode(infosTo);
    const tableNameTo = (currentNodeTo?.data.title).split('.')[0];
    const fieldNameTo = (currentNodeTo?.data.title).split('.')[1];

    deleteEdgeSocket({ from: { table: tableNameFrom, field: fieldNameFrom }, to: { table: tableNameTo, field: fieldNameTo } })
    setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, [getNode]);

  const onConnect: OnConnect = useCallback(
    (connection) => {
      
      // Add socket infos & call
      if (connection.source && connection.target) {
        const nodeFrom = getNode(connection.source);
        const nodeTo = getNode(connection.target);

        addEdgeSocket({ from: { table: (nodeFrom?.data.title).split('.')[0], field: nodeFrom?.data.name }, to: { table: (nodeTo?.data.title).split('.')[0], field: nodeTo?.data.name } })
      }

      setEdges((eds) => addEdge(connection, eds))
    },
    [setEdges, getNode]
  );

  return { edges, setEdges, onEdgeUpdateStart, onEdgesChange, onEdgeUpdate, onEdgeUpdateEnd, onConnect }
}