import React from 'react';
import { Handle, Position } from 'reactflow';

export const MarriageNode: React.FC = () => {
  return (
    <div className='text-updater-node'>
      <div>marries</div>
      <Handle type='target' position={Position.Left} id='husband' />
      <Handle type='target' position={Position.Right} id='wife' />
      <Handle type='source' position={Position.Bottom} id='children' />
    </div>
  );
};
