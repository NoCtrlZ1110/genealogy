import { Node } from 'reactflow';
import dagre from 'dagre';

export const createNode = ({
  id,
  label,
  level,
  type,
}: {
  id: number;
  label: string;
  level: number;
  type?: string;
}) => {
  const x = Math.random() * window.innerWidth - 100;
  const y = level * 100;

  return {
    id: id.toString(),
    position: { x, y },
    data: { label },
    type,
  } as Node<{ label: string }, string | undefined>;
};

const nodeWidth = 172;
const nodeHeight = 36;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export const getLayoutedElements = (nodes: any[], edges: any[]) => {
  dagreGraph.setGraph({});

  nodes.forEach((node: { id: any }) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge: { source: any; target: any }) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node: { id: any; position: { x: number; y: number } }) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};
