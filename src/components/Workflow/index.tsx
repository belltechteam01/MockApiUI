import React, { useMemo, useRef, useState, useCallback } from "react";
import styles from "./styles.module.scss";
import ReactFlow from 'react-flow-renderer';
import * as ReactflowRenderer from 'react-flow-renderer';
import ToolBar from '../ToolBar';
import {CWorkflow} from "../../services/workflow"
import {WorkflowSettings} from 'services/workflow/settings';
import NodeComponent from 'components/Workflow/NodeComponent';

//interfaces

//functions

const getClientRect = (reactObj: React.MutableRefObject<HTMLElement>) : DOMRect => {
    return reactObj.current.getBoundingClientRect();
}

const getPosition = (pos: ReactflowRenderer.XYPosition , clientRect: DOMRect) => {
    return {
        x: (pos.x - clientRect.left),
        y: (pos.y - clientRect.top)
    }
}

const getReactNodeProps = (id: string, pos: ReactflowRenderer.XYPosition, data: any) => {

    return {
        id: id,
        type: 'workNode',
        position: pos,
        data: data
    }
}

const Workflow = () => {
  //react flow usage
    const nodeTypes = useMemo(() => ({ 
        workNode: NodeComponent 
    }), []);

    //reactflow state wrapper
    const reactFlowWrapper: React.MutableRefObject<any> = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
    const [nodes, setNodes, onNodesChange] = ReactflowRenderer.useNodesState([]);
    const [edges, setEdges, onEdgesChange] = ReactflowRenderer.useEdgesState([]);
    const [workflow, setWorkflow] = useState<CWorkflow> (new CWorkflow());

    //callbacks
    const onDrop = useCallback((_event: any) => {
        _event.preventDefault();

        let rcClient = getClientRect(reactFlowWrapper);
        let posDropped = {
            x: (_event.clientX - rcClient.left),
            y: (_event.clientY - rcClient.top)
        };

        const droppedNode = JSON.parse(_event.dataTransfer.getData('reactflow/type'));
        if (typeof droppedNode === 'undefined' || !droppedNode) return;

        const worknode = workflow.addNew(droppedNode.type);
        
        const posInstance = reactFlowInstance.project( posDropped );
        worknode.setPosition(posDropped.x, posDropped.y);

        setNodes((nodes) => nodes.concat(getReactNodeProps(
            worknode.id,
            posInstance,
            workflow
        )));

    }, [reactFlowInstance]);
    
    const onDragOver = useCallback((event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onConnect = useCallback(
        (params) => setEdges((eds) => ReactflowRenderer.addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, eds)),
        []
    );
    //states
    //const [isSelectable, setIsSelectable] = useState(false);

    return (
        <div className={styles.root}>
            <ReactflowRenderer.ReactFlowProvider>
                <ToolBar />
                <div className={styles.reactflowWrapper} ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        defaultZoom={1}
                        attributionPosition="bottom-left"
                    >
                        <ReactflowRenderer.Background />
                        <ReactflowRenderer.Controls />
                    </ReactFlow>
                </div>
            </ReactflowRenderer.ReactFlowProvider>
        </div>
    );
};

export default Workflow;