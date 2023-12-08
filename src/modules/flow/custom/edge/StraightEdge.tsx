import {
  BaseEdge,
  // EdgeLabelRenderer,
  getStraightPath,
  // useReactFlow,
} from 'reactflow';

interface StraightEdgeProps {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}

export const StraightEdge: React.FC<StraightEdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}) => {
  const [
    edgePath,
    // labelX, labelY
  ] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  // const { setEdges } = useReactFlow();

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      {/* <EdgeLabelRenderer>
        <button
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className='nodrag nopan'
          onClick={() => {
            setEdges((es) => es.filter((e) => e.id !== id));
          }}
        >
          delete
        </button>
      </EdgeLabelRenderer> */}
    </>
  );
};
