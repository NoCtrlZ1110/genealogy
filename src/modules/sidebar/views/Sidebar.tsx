import styled from '@emotion/styled';
import { Button, Divider, Flex, Form, Input } from 'antd';
import React from 'react';
import { Edge, Node } from 'reactflow';
import { DeleteOutlined } from '@ant-design/icons';
import { getLayoutedElements } from '../../flow/custom/node/utils';
import { useForm } from 'antd/es/form/Form';

interface SidebarProps {
  nodes: Node<any, string | undefined>[];
  setNodes: React.Dispatch<
    React.SetStateAction<Node<any, string | undefined>[]>
  >;
  edges: Edge<any>[];
  setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>;
}

export const Sidebar: React.FC<SidebarProps> = ({ nodes, setNodes, edges }) => {
  const [form] = useForm();

  const handleDelete = (id: string) => {
    setNodes(nodes.filter((node) => node.id !== id));
  };

  const onAdd = ({ label }) => {
    const newId = Math.max(...nodes.map((node) => parseInt(node.id)), 0) + 1;
    const newNodes = [...nodes, { id: newId.toString(), data: { label } }];
    setNodes(getLayoutedElements(newNodes, edges).nodes);
    form.resetFields();
  };

  return (
    <Flex vertical>
      <ItemsWrapper>
        {nodes.map(({ id, data }) => {
          return (
            <NodeWrapper>
              <span style={{ color: 'gray' }}>ID: {id}</span>
              <span style={{ textAlign: 'center', flexGrow: 1 }}>
                {data.label}
              </span>
              <Button type='dashed' danger onClick={() => handleDelete(id)}>
                <DeleteOutlined />
              </Button>
            </NodeWrapper>
          );
        })}
      </ItemsWrapper>
      <Divider style={{ marginBottom: 0 }} />
      <Form
        layout='inline'
        style={{ padding: '1em' }}
        onFinish={onAdd}
        form={form}
      >
        <Form.Item
          name='label'
          style={{ flexGrow: 1 }}
          rules={[
            {
              required: true,
              message: 'Please enter a name',
            },
          ]}
        >
          <Input placeholder='Enter name' size='large' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' size='large'>
            Add
          </Button>
        </Form.Item>
        {/* </Flex> */}
      </Form>
    </Flex>
  );
};

const ItemsWrapper = styled.aside`
  width: 400px;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 2em;
  flex-grow: 1;
`;

const NodeWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.4em 0.4em 0.4em 0.8em;
  border: 1px solid #cdc2c2;
  border-radius: 0.75em;
  margin-bottom: 1em;
  cursor: pointer;
`;
