import React, { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import ReactFlow from 'react-flow-renderer';
import * as ReactflowRenderer from 'react-flow-renderer';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import ToolBar from '../ToolBar';
import { CWorkflow, EvtCode, WorkflowState, WxEvent} from '../../services/workflow';
import { WorkflowSettings } from 'services/workflow/settings';
import NodeComponent from 'components/Workflow/NodeComponent';
import SettingBar from '../SettingBar';
import styles from './styles.module.scss';
import { ENM_EDIT_SUBSTATE, ENM_FLOW_STATE } from 'services/workflow/workmap/worknode';

//interfaces
const nodeTypes = {
  workNode: NodeComponent
};

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

var workflow: CWorkflow = new CWorkflow();

const Workflow = (props: any) => {

  //react flow usage  

  //reactflow state wrapper
  const reactFlowWrapper: React.MutableRefObject<any> = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [nodes, setNodes, onNodesChange] = ReactflowRenderer.useNodesState([]);
  const [edges, setEdges, onEdgesChange] = ReactflowRenderer.useEdgesState([]);
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
      
      const posInstance = reactFlowInstance.project(posDropped);

      // console.log("[LOG] workflow state", workflow);
      //[LOGIC] place node
      if(workflow) {
        const worknode = workflow.placeNode(droppedNode.type);
        worknode.setPosition(posDropped.x, posDropped.y);

        setNodes((nodes) => nodes.concat(getReactNodeProps(worknode.id, posInstance, workflow)));
      }
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onNodeClick = useCallback((event: React.MouseEvent, node: ReactflowRenderer.Node) => {

    if(workflow) {
      const workNode = workflow.worklist.get(node.id);

      if( workflow.isState(WorkflowState.EDIT) && workNode) {
        setShowPropertyInspector(true);
        setSelectedNode(node.id);
      } else {
        CWorkflow.getInstance().emit(WxEvent[WxEvent.WARN], EvtCode.EVT_SETTING_FAILED_OPEN);
      }
    }
  }, []);

  const onConnect = (params: any) => {
    // console.log('params===>', params);
    // params.label = 'test-edge';
    params.className = 'normal-edge';
    params.style = { stroke: 'gray', strokeWidth: 3 };
    params.markerEnd = {
      type: ReactflowRenderer.MarkerType.ArrowClosed,
      color: 'gray'
    };
    params.data = {
      lineWidth: 1,
      lineColor: '#de6543'
    };
    // params.markerEnd.type = MarkerType.ArrowClosed;
    
    setEdges((eds) => {

      return ReactflowRenderer.addEdge(params, eds);
    });
  };

  const onSave = () => {

    setShowPropertyInspector(false);
  };

  const handleToolbar = () => {
    setShowToolbar(!showToolbar);
  };

  const onFileOpen = () => {
    workflow.getFlowData();
    workflow.getApiListData("1", true);
    // workflow.getApiDetailData("1","c57a4706-bf0d-4a64-84ca-6374e6439416", true);
  }

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
              <ReactflowRenderer.ControlButton onClick={() => onFileOpen()}>
                <FileOpenIcon />
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
          onSave={() => onSave()}
          onClose={() => {
            setShowPropertyInspector(false);
          }}
        />
      )}
    </div>
  );
};

export default Workflow;
