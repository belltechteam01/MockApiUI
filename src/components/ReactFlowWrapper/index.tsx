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
import ToolBar from '../ToolBar';
import NodeSetting from '../NodeSetting';

import styles from './styles.module.scss';
import { NODE_TYPES } from 'utils/constant';
import { API_DETAIL_LIST, API_LIST } from 'testData/getApiList';

// const nodeTypes = {
//   shape: ShapeNode
// };

const defaultNodes: Node[] = [];

const defaultEdgeOptions = {
  type: 'smoothstep',
  markerEnd: { type: MarkerType.ArrowClosed },
  style: { strokeWidth: 2 }
};

const defaultEdges: Edge[] = [];

const proOptions = { account: 'paid-pro', hideAttribution: true };

const backgroundColor = '#fff';

const ReactFlowWrapper = () => {
  let id = 0;
  // const getId = () => `dndnode_${id++}`;

  const reactFlowWrapper: React.MutableRefObject<any> = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const nodeTypes = useMemo(() => ({ shape: ShapeNode }), []);
  useEffect(() => {
    if (selectedNode?.data && selectedNode?.data?.type) {
      switch (selectedNode?.data?.type) {
        case NODE_TYPES.CALL_API:
          setIsOpen(true);
          break;
        case NODE_TYPES.CALL_RULE:
          setIsOpen(true);
          break;
        case NODE_TYPES.CHECK:
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

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const data = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      console.log('dragData==>', data);

      // check if the dropped element is valid
      if (typeof data === 'undefined' || !data) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top
      });
      const uuid = uuidv4();
      console.log('uuid==>', uuid);
      const newNode = {
        id: uuid,
        type: 'shape',
        position,
        data: {
          type: data?.type,
          width: 150,
          height: 50,
          color: data?.color || 'blue',
          label: `${data?.text}`,
          processing: false,
          status: 'stop',
          properties: {}
        }
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    console.log('node click===>', node);
    setSelectedNode(node);
  }, []);

  const handleSave = (data) => {
    const newProperty = {
      ...selectedNode?.data,
      label: data?.nodeName,
      properties: data
    };

    const newNode: any = { ...selectedNode, ...{ data: newProperty } };

    const updateNodes = nodes.map((node) => {
      if (node.id === selectedNode?.id) {
        node = newNode;
      }
      return node;
    });
    setNodes(updateNodes);
    setSelectedNode(null);
  };

  const handleSelectedNode = (event, value) => {
    if (!value) setSelectedNode(null);
  };

  const handleGetAPI = (value) => {
    console.log('selected API===>', value);
    const selectedAPI = API_DETAIL_LIST.find((item) => item.id === value);
    let tempNode: any = { ...selectedNode } || {};
    tempNode.data.properties.requestData = selectedAPI?.requestData;
    tempNode.data.properties.responseData = selectedAPI?.responseData;
    setSelectedNode(tempNode);
  };

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
            defaultNodes={defaultNodes}
            defaultEdges={defaultEdges}
            defaultEdgeOptions={defaultEdgeOptions}
            connectionLineType={ConnectionLineType.SmoothStep}
            connectionMode={ConnectionMode.Loose}
            onNodeClick={onNodeClick}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
      {selectedNode && (
        <NodeSetting onSave={(data) => handleSave(data)} isOpen={isOpen} onDrawerClose={handleSelectedNode} data={selectedNode?.data || {}} selectList={API_LIST} onSelectAPI={handleGetAPI} />
      )}
    </div>
  );
};

export default ReactFlowWrapper;
