import { useState, useCallback, useRef } from 'react';
import { Edge, OnEdgesChange, applyEdgeChanges, Connection, OnConnect, updateEdge, addEdge} from 'reactflow';

const initialEdges = [{ id: 'Users.2-UsersGroup.3', source: '2', target: '4', animated: true }];

export const useEdges = () => {
  const [ edges, setEdges ] = useState<Edge[]>(initialEdges);
  const edgeUpdateSuccessful = useRef(true);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onEdgeUpdate = useCallback((oldEdge: Edge, newConnection: Connection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_: any, edge: Edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return { edges, setEdges, onEdgeUpdateStart, onEdgesChange, onEdgeUpdate, onEdgeUpdateEnd, onConnect }
}