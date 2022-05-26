import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  ReactFlowProvider,
  ConnectionLineType,
  MarkerType,
  ConnectionMode,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls
} from 'react-flow-renderer';

import { v4 as uuidv4 } from 'uuid';
import ShapeNode from '../ShapeNode';
import NodeComponent from 'components/Workflow/NodeComponent';

import ToolBar from '../ToolBar';
import NodeSetting from '../NodeSetting';

import styles from './styles.module.scss';
import { API_DETAIL_LIST, API_LIST } from 'testData/getApiList';

import {CWorkflow, Workflow} from "../../services/workflow"

import * as Types from "../../services/workflow/types";
// import { WorkNode } from 'services/workflow/workmodel';
import * as WorkModel from "services/workflow/workmodel";
import {WorkflowSettings} from 'services/workflow/settings';

//internal types
export interface IApiListState {
  value: string;
  label: string;
}

interface IEdgeOptionMarker {
  type: MarkerType;
}

interface IEdgeOptionsStyle {
  strokeWidth: number;
}

export interface IEdgeOptions {
  type: ConnectionLineType;
  markerEnd: IEdgeOptionMarker;
  style: IEdgeOptionsStyle
}

//constants
const proOptions = { account: 'paid-pro', hideAttribution: true };
const backgroundColor = '#fff';

//component
const ReactFlowWrapper = () => {
  //react flow usage
  const nodeTypes = useMemo(() => ({ 
    workNode: NodeComponent 
  }), []);


  //define state
  const reactFlowWrapper: React.MutableRefObject<any> = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [apiListState, setApiListState] = useState<IApiListState[]>(API_LIST);

  const [workflow, setWorkflow] = useState<CWorkflow> (new CWorkflow());

  //check states
  useEffect(() => {
    if (selectedNode?.data && selectedNode?.data?.type) {
      switch (selectedNode?.data?.type) {
        case Types.FlowCatagory.API:
          setIsOpen(true);
          break;
        case Types.FlowCatagory.RULE:
          setIsOpen(true);
          break;
        case Types.FlowCatagory.CHECK:
          setIsOpen(true);
          break;
        default:
          setIsOpen(false);
          break;
      }
    } else {
      setIsOpen(false);
    }
  }, [selectedNode?.data]);

  //actions
  const onDragOver = useCallback(
    (event: any) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    }, 
    []
  );
  
  const onDrop = useCallback(
    (_event: any) => {
      _event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const curNodeData = JSON.parse(_event.dataTransfer.getData('application/reactflow'));

      console.log("[LOG] curNodeData => ", curNodeData.type);
      if (typeof curNodeData === 'undefined' || !curNodeData) return;
      
      const newNodeColor = curNodeData.color;

      let newNode: WorkModel.WorkNode | null= null;
      switch(curNodeData.type) {
        case Types.FlowCatagory.API:
          newNode = new WorkModel.CallApi("untitled");
        break;
        case Types.FlowCatagory.ACTION:
          newNode = new WorkModel.Action("untitled");
        case Types.FlowCatagory.RULE:
          newNode = new WorkModel.CallRule("untitled");
        case Types.FlowCatagory.DELAY:
          newNode = new WorkModel.Wait("untitled");
        case Types.FlowCatagory.CHECK:
          newNode = new WorkModel.Check("untitled");
        case Types.FlowCatagory.MERGE:
          newNode = new WorkModel.Merge("untitled");
        case Types.FlowCatagory.SPLIT:
          newNode = new WorkModel.Split("untitled");
        break;
      }
      if(newNode) {

        const newNodePos = reactFlowInstance.project({
          x: (_event.clientX - reactFlowBounds.left),
          y: (_event.clientY - reactFlowBounds.top)
        });
        newNode.setPosition((_event.clientX - reactFlowBounds.left), (_event.clientY - reactFlowBounds.top));

        workflow.add(newNode);

        const _new = {
          id: newNode.id,
          type: WorkflowSettings.NODE_SHAPE_DEFAULT,
          position: newNodePos,
          data: workflow
        }

        //add node ui in react flow
        console.log("[LOG] new node ", _new);
        setNodes((nodes) => nodes.concat(_new));
      }
    },

    [reactFlowInstance]
  );

  // const onConnect = useCallback(
  //   (params: any) => setEdges((eds) => addEdge(params, eds)), 
  //   []
  // );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  // const handleSave = (data) => {
  //   const newProperty = {
  //     ...selectedNode?.data,
  //     label: data?.nodeName,
  //     properties: data
  //   };

  //   const newNode: any = { ...selectedNode, ...{ data: newProperty } };

  //   const updateNodes = nodes.map((node) => {
  //     if (node.id === selectedNode?.id) {
  //       node = newNode;
  //     }
  //     return node;
  //   });
  //   setNodes(updateNodes);
  //   setSelectedNode(null);
  // };

  // const handleSelectedNode = (event, value) => {
  //   if (!value) setSelectedNode(null);
  // };

  // const handleGetAPI = (value) => {
  //   console.log('selected API===>', value);
  //   const selectedAPI = API_DETAIL_LIST.find((item) => item.id === value);
  //   let tempNode: any = { ...selectedNode } || {};
  //   tempNode.data.properties.requestData = selectedAPI?.requestData;
  //   tempNode.data.properties.responseData = selectedAPI?.responseData;
  //   setSelectedNode(tempNode);
  // };

  return (
    <div className={styles.dndflow}>
      <ReactFlowProvider>
        <ToolBar />
        <div className={styles.reactflowWrapper} ref={reactFlowWrapper}>
          <ReactFlow
            style={{ backgroundColor }}
            proOptions={proOptions}
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            // defaultNodes={defaultNodes}
            // defaultEdges={defaultEdges}
            // defaultEdgeOptions={defaultEdgeOptions}
            connectionLineType={ConnectionLineType.SmoothStep}
            connectionMode={ConnectionMode.Loose}
            onNodeClick={onNodeClick}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            // onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView={true}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
      {selectedNode && (
        <NodeSetting 
          // onSave={(data) => handleSave(data)} 
          // isOpen={isOpen} onDrawerClose={handleSelectedNode} 
          nodeInfo={selectedNode?.data || {}} 
          selectList={apiListState} 
          // onSelectAPI={handleGetAPI} 
        />
      )}
    </div>
  );
};

export default ReactFlowWrapper;
