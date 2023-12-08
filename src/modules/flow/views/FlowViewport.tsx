import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  MiniMap,
  StraightEdge,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import { useCallback } from 'react';
import { CustomEdge } from '..';
import { MarriageNode } from '../custom/node/MarriageNode';
import { createNode } from '../custom/node/utils';

const initialNodes = [
  createNode({ id: 1, label: 'Ông nội', level: 0, gender: 'male' }),
  createNode({ id: 2, label: 'Bà nội', level: 0, gender: 'female' }),
  createNode({ id: 3, label: '1&2', level: 0, type: 'marriage-node' }),
  createNode({ id: 4, label: 'Bố', level: 1, gender: 'male' }),
];
const initialEdges = [
  {
    id: '1->3',
    source: '1',
    target: '3',
    type: 'straight-edge',
    targetHandle: 'husband',
  },
  {
    id: '2->3',
    source: '2',
    target: '3',
    type: 'straight-edge',
    targetHandle: 'wife',
  },
  {
    source: '3',
    target: '4',
    type: 'straight-edge',
  },
];

const nodeTypes = {
  'marriage-node': MarriageNode,
};

const edgeTypes = {
  'custom-edge': CustomEdge,
  'straight-edge': StraightEdge,
};

export const FlowViewport: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  //   const onConnect = useCallback(
  //     (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
  //     [setEdges]
  //   );

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = { ...connection, type: 'custom-edge' };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};
