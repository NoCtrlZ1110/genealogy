import React, { useMemo } from 'react';
import {
  getConnectedEdges,
  Handle,
  HandleType,
  Position,
  useNodeId,
  useStore,
} from 'reactflow';

const selector = (s: any) => ({
  nodeInternals: s.nodeInternals,
  edges: s.edges,
});

export const LimitHandle: React.FC<{
  type: HandleType;
  position: Position;
  isConnectable:
    | ((props: { node: any; connectedEdges: any }) => boolean)
    | number;
}> = (props) => {
  const { isConnectable } = props;
  const { nodeInternals, edges } = useStore(selector);
  const nodeId = useNodeId();

  const isHandleConnectable = useMemo(() => {
    if (typeof isConnectable === 'function') {
      const node = nodeInternals.get(nodeId);
      const connectedEdges = getConnectedEdges([node], edges);

      return isConnectable({ node, connectedEdges });
    }

    if (typeof isConnectable === 'number') {
      const node = nodeInternals.get(nodeId);
      const connectedEdges = getConnectedEdges([node], edges);

      return connectedEdges.length < isConnectable;
    }

    return !!isConnectable;
  }, [nodeInternals, edges, nodeId, isConnectable]);

  return <Handle {...props} isConnectable={isHandleConnectable}></Handle>;
};
