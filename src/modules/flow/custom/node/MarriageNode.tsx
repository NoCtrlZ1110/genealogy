import styled from '@emotion/styled';
import React from 'react';
import { Handle, Position } from 'reactflow';
import icon from './marriage-icon.svg';
import { LimitHandle } from '../handle';

export const MarriageNode: React.FC = () => {
  return (
    <Wrapper>
      <Circle>
        <img src={icon} width='100%' />
      </Circle>
      <LimitHandle type='target' position={Position.Top} isConnectable={2} />
      <Handle type='source' position={Position.Bottom} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 150px;
  align-items: center;
  display: grid;
  place-items: center;
`;

const Circle = styled.div`
  width: 20px;
  height: 20px;
  padding: 0.5em;
  background: white;
  border: 1px solid #cdc2c2;
  border-radius: 50%;
  display: grid;
  place-items: center;
`;
