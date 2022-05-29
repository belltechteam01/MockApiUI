import React, { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import ReactFlow from 'react-flow-renderer';
import * as ReactflowRenderer from 'react-flow-renderer';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ToolBar from '../ToolBar';
import { CWorkflow } from '../../services/workflow';
import { WorkflowSettings } from 'services/workflow/settings';
import NodeComponent from 'components/Workflow/NodeComponent';
import SettingBar from '../SettingBar';
import styles from './styles.module.scss';

//interfaces

//functions

const getClientRect = (reactObj: React.MutableRefObject<HTMLElement>): DOMRect => {
  return reactObj.current.getBoundingClientRect();
};

const getPosition = (pos: ReactflowRenderer.XYPosition, clientRect: DOMRect) => {
  return {
    x: pos.x - clientRect.left,
    y: pos.y - clientRect.top
  };
};

const getReactNodeProps = (id: string, pos: ReactflowRenderer.XYPosition, data: any) => {
  return {
    id: id,
    type: 'workNode',
    position: pos,
    data: data
  };
};

const Workflow = () => {
  //react flow usage
  const nodeTypes = useMemo(
    () => ({
      workNode: NodeComponent
    }),
    []
  );

  //reactflow state wrapper
  const reactFlowWrapper: React.MutableRefObject<any> = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [nodes, setNodes, onNodesChange] = ReactflowRenderer.useNodesState([]);
  const [edges, setEdges, onEdgesChange] = ReactflowRenderer.useEdgesState([]);
  const [workflow, setWorkflow] = useState<CWorkflow>(new CWorkflow());
  const [showToolbar, setShowToolbar] = useState<boolean>(true);

  //states
  const [isEdit, setEdit] = useState(true);
  const [selectedNode, setSelectedNode] = useState<string>('undefined');
  const [showPropertyInspector, setShowPropertyInspector] = useState<boolean>(false);

  //callbacks
  const onDrop = useCallback(
    (_event: any) => {
      _event.preventDefault();

      let rcClient = getClientRect(reactFlowWrapper);
      let posDropped = {
        x: _event.clientX - rcClient.left,
        y: _event.clientY - rcClient.top
      };

      const droppedNode = JSON.parse(_event.dataTransfer.getData('reactflow/type'));
      if (typeof droppedNode === 'undefined' || !droppedNode) return;

      const worknode = workflow.addNew(droppedNode.type);

      const posInstance = reactFlowInstance.project(posDropped);
      worknode.setPosition(posDropped.x, posDropped.y);

      setNodes((nodes) => nodes.concat(getReactNodeProps(worknode.id, posInstance, workflow)));
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onConnect = (params: any) => {
    console.log('params===>', params);
    params.label = 'test-edge';
    params.className = 'normal-edge';
    params.style = { stroke: 'blue', strokeWidth: 3 };
    params.markerEnd = {
      type: ReactflowRenderer.MarkerType.ArrowClosed,
      color: 'red'
    };
    params.data = {
      lineWidth: 2,
      lineColor: '#de6543'
    };
    // params.markerEnd.type = MarkerType.ArrowClosed;

    setEdges((eds) => {
      console.log('edges===>', eds);

      return ReactflowRenderer.addEdge(params, eds);
    });
  };

  const onSave = (params: any) => {
    console.log('[LOG] onsave params', params);
  };

  const onNodeClick = useCallback((event: React.MouseEvent, node: ReactflowRenderer.Node) => {
    setShowPropertyInspector(true);
    setSelectedNode(node.id);
  }, []);

  useEffect(() => {
    if (selectedNode != 'undefined') {
    }
  }, [selectedNode]);

  const handleToolbar = () => {
    setShowToolbar(!showToolbar);
  };

  return (
    <div className={styles.root}>
      <ReactflowRenderer.ReactFlowProvider>
        {showToolbar && <ToolBar />}
        <div className={styles.reactflowWrapper} ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            className={styles.workflow}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            selectNodesOnDrag={false}
            defaultZoom={1}
            attributionPosition="bottom-left"
          >
            <ReactflowRenderer.Background />
            <ReactflowRenderer.Controls>
              <ReactflowRenderer.ControlButton onClick={() => handleToolbar()}>
                <MenuOpenIcon />
              </ReactflowRenderer.ControlButton>
            </ReactflowRenderer.Controls>
          </ReactFlow>
        </div>
      </ReactflowRenderer.ReactFlowProvider>
      {isEdit && (
        <SettingBar
          isShow={isEdit && showPropertyInspector}
          nodeId={selectedNode}
          workflow={workflow}
          onSave={onSave}
          onClose={() => {
            setShowPropertyInspector(false);
          }}
        />
      )}
    </div>
  );
};

export default Workflow;
