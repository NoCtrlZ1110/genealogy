import { Node } from 'reactflow';
export const createNode = ({
  id,
  label,
  level,
  type,
  gender,
}: {
  id: number;
  label: string;
  level: number;
  type?: string;
  gender?: 'male' | 'female';
}) => {
  const x = Math.random() * window.innerWidth - 100;
  const y = level * 100;
  const isMale = gender === 'male';
  const targetPosition = 'top';
  const sourcePosition = isMale ? 'right' : 'left';

  return {
    id: id.toString(),
    position: { x, y },
    data: { label },
    targetPosition,
    sourcePosition,
    type,
  } as Node<{ label: string }, string | undefined>;
};

// const createMarriageNode = ([husband, wife]: Node[]) => {
//     createNode({})
// };
