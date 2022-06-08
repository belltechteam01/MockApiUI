import React, { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import ReactFlow, { Edge } from 'react-flow-renderer';
import * as ReactflowRenderer from 'react-flow-renderer';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import ToolBar from '../ToolBar';
import { CWorkflow, EvtCode, STATE_WORKFLOW, WxEvent} from '../../services/workflow';
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

new CWorkflow();

const Workflow = (props: any) => {

  const workflow = CWorkflow.getInstance();
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

      if( workflow.isState(STATE_WORKFLOW.EDIT) && workNode) {
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
    params.style = { stroke: WorkflowSettings.EDGE_STROKE_COLOR, strokeWidth: WorkflowSettings.EDGE_STROKE_WIDTH };
    params.markerEnd = {
      type: ReactflowRenderer.MarkerType.ArrowClosed,
      color: WorkflowSettings.EDGE_STROKE_COLOR,
    };
    
    setEdges((eds) => {
      const edge = ReactflowRenderer.addEdge(params, eds);
      if(edge.length > 0) {
        const new_edge = edge[edge.length-1];
        console.log("[LOG] onConnect - edge", edge);
        console.log("[LOG] onConnect - edge", new_edge);
        workflow.onConnect(new_edge.id, new_edge.source, new_edge.target);
      }
      return edge;
    });
  };

  const onEdgeClick = (event: React.MouseEvent, edge: Edge) => 
  {
    console.log("[LOG] clicked edge - event", event);
    console.log("[LOG] clicked edge - edge", edge);

  }

  const onEdgeDelete = (_edges: Edge[]) => 
  {
    console.log("[LOG] onEdge delete", _edges);
    // setEdges(_edges);
  }

  const onSave = () => {
    setShowPropertyInspector(false);
  };

  const handleToolbar = () => {
    setShowToolbar(!showToolbar);
  };

  const onFileOpen = () => {
    workflow.getFlowData();
    workflow.getApiListData("1", true);
  }

  const onRun = () => {
    console.log("[LOG] workflow run", workflow);
    console.log("[LOG] workflow edges", edges);
  };

  const onValidate = () => {
    console.log("[LOG] workflow run", workflow);
  };

  useCallback(() => {
    console.log("[LOG] use callback ", edges);
  },[edges])

  return (
    <div className={styles.root}>
      <ReactflowRenderer.ReactFlowProvider>
        {showToolbar && <ToolBar onRun={onRun} onValidate={onValidate} />}
        <div className={styles.reactflowWrapper} ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            className={styles.workflow}

            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}

            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onEdgeClick={onEdgeClick}
            onEdgesDelete={onEdgeDelete}
            
            onNodeClick={onNodeClick}
            selectNodesOnDrag={false}
            onNodesChange={onNodesChange}
            
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
