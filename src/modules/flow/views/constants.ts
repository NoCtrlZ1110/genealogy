import { createNode } from '../custom/node/utils';
import { ConnectionLineType, Edge, Node } from 'reactflow';

export const initialNodes: Node<any, string | undefined>[] | undefined = [
  createNode({ id: 1, label: 'Father', level: 0, gender: 'male' }),
  createNode({ id: 2, label: 'Mother', level: 0, gender: 'female' }),
  createNode({ id: 3, label: '1&2', level: 0, type: 'marriage-node' }),
  createNode({ id: 4, label: 'Son', level: 1, gender: 'male' }),
  createNode({ id: 5, label: 'Girl', level: 1, gender: 'female' }),
];

export const initialEdges: Edge<any>[] = [
  {
    id: '1->3',
    source: '1',
    target: '3',
    type: ConnectionLineType.SmoothStep,
    animated: true,
  },
  {
    id: '2->3',
    source: '2',
    target: '3',
    type: ConnectionLineType.SmoothStep,
    animated: true,
  },
  {
    id: '3->4',
    source: '3',
    target: '4',
    type: ConnectionLineType.SmoothStep,
    animated: true,
  },
  {
    id: '3->5',
    source: '3',
    target: '5',
    type: ConnectionLineType.SmoothStep,
    animated: true,
  },
];
