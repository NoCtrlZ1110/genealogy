import { ReactFlowProvider } from 'reactflow';
import './App.css';
import { FlowViewport } from './modules/flow/views/FlowViewport';

export const App: React.FC = () => {
  return (
    <ReactFlowProvider>
      <FlowViewport />
    </ReactFlowProvider>
  );
};
