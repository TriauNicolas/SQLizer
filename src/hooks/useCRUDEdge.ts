import { useReactFlow, Edge } from 'reactflow';
import { Relation } from '@/types/tables';

export const useCRUDEdge = (setNodes: Function, setEdges: Function) => {
  const { getNodes, getEdges } = useReactFlow();

  const addEdge = (relation: Relation) => {
    const allNodes = getNodes();
    const nodeFrom = allNodes.find((node) => node.data.title === `${relation.from.table}.${relation.from.field}`);
    const nodeTo = allNodes.find((node) => node.data.title === `${relation.to.table}.${relation.to.field}`);

    if (nodeFrom && nodeTo) {
      const newEdge = { id: `reactflow_edge-${nodeFrom.id}-${nodeTo.id}`, source: nodeFrom.id, sourceHandle: null, target: nodeTo.id, targetHandle: null }

      setEdges([...getEdges(), newEdge]);
    }
  }

  const deleteEdge = (relation: Relation) => {
    const allNodes = getNodes();
    const nodeFrom = allNodes.find((node) => node.data.title === `${relation.from.table}.${relation.from.field}`);
    const nodeTo = allNodes.find((node) => node.data.title === `${relation.to.table}.${relation.to.field}`);

    if (nodeFrom && nodeTo) {
      const newEdges = getEdges().filter((edge) => edge.source !== nodeFrom.id && edge.source !== nodeTo.id && edge.target !== nodeFrom.id && edge.target !== nodeTo.id);

      setEdges(newEdges)
    }
  }

  return { addEdge, deleteEdge }
}