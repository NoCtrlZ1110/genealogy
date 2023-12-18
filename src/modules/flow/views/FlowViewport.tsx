import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MiniMap,
  StraightEdge,
  addEdge,
  useEdgesState,
  useNodesState,
  ConnectionLineType,
  Connection,
  useReactFlow,
  Panel,
} from 'reactflow';
import { useCallback, useEffect } from 'react';
import { CustomEdge } from '..';
import { MarriageNode } from '../custom/node/MarriageNode';
import { initialEdges, initialNodes } from './constants';
import { Sidebar } from '../..';
import { Button, Flex } from 'antd';
import { createNode, getLayoutedElements } from '../custom/node/utils';

const nodeTypes = {
  'marriage-node': MarriageNode,
};

const edgeTypes = {
  'custom-edge': CustomEdge,
  'straight-edge': StraightEdge,
};

/* --- */

const { nodes: _nodes, edges: _edges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

export const FlowViewport: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(_nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(_edges);
  const { fitView } = useReactFlow();

  const onLayout = useCallback(() => {
    // console.log('onLayout');
    // TODO: fix loop
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges
    );
    setNodes([...layoutedNodes]);
  }, [nodes, edges, setNodes]);

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      );
      onLayout();
    },
    [onLayout, setEdges]
  );

  const handleAddNewPerson = useCallback(() => {
    const newNode = createNode({
      id: Math.max(...nodes.map((node) => parseInt(node.id)), 0) + 1,
      label: 'New Person',
      level: 0,
    });
    setNodes((nds) => nds.concat(newNode));
  }, [nodes, setNodes]);

  const handleAddNewMarriage = useCallback(() => {
    const newNode = createNode({
      id: Math.max(...nodes.map((node) => parseInt(node.id)), 0) + 1,
      label: 'New Marriage',
      level: 0,
      type: 'marriage-node',
    });
    setNodes((nds) => nds.concat(newNode));
  }, [nodes, setNodes]);

  useEffect(() => {
    fitView();
    onLayout();
  }, [nodes, edges, fitView, onLayout]);

  return (
    <Flex>
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          {...{
            nodes,
            edges,
            onNodesChange,
            onEdgesChange,
            onConnect,
            nodeTypes,
            edgeTypes,
          }}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          <Panel position='top-right'>
            <Flex gap={12}>
              <Button onClick={handleAddNewPerson}>Add person</Button>
              <Button onClick={handleAddNewMarriage}>Add marriage node</Button>
            </Flex>
          </Panel>
        </ReactFlow>
      </div>
      <Sidebar {...{ nodes, setNodes, edges, setEdges }} />
    </Flex>
  );
};
