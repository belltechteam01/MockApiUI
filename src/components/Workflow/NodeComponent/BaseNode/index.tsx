import React, {
    useEffect, 
    useRef, 
    useState,
    useCallback,
    ReactNode
} from "react";

import styles from "./styles.module.scss";
import ReactFlow, {
    Node, 
    NodeTypesWrapped,
    Handle,
    Position,
    Edge
} from 'react-flow-renderer';

import * as ReactflowRenderer from 'react-flow-renderer';
import * as NodeUITypes from "../../types";
import * as Types from "services/workflow/types";

import {CWorkNode as WorkNode} from "services/workflow/workmap/worknode";
import { CWork } from "services/workflow/workmodel/models/work";
import {WorkflowSettings} from "services/workflow/settings";


//interfaces
export interface IBaseNodeComponentProps extends Node<WorkNode<CWork>> {

}

//functions
const nodeType2Str = (type: Types.FlowCatagory | undefined): string => {
    if(type === undefined) return Types.FlowCatagory[Types.FlowCatagory.START];
    return Types.FlowCatagory[type];
}

const nodeTypeToEnum = (type: string | undefined): Types.FlowCatagory => {
    if(type === undefined) return Types.FlowCatagory.START;
    return Types.FlowCatagory[type];
}

const getNodeSize = (type: Types.FlowCatagory): ReactflowRenderer.Dimensions => {
    let ret: ReactflowRenderer.Dimensions = {
        width:  WorkflowSettings.NODE_WIDTH_DEFAULT,
        height: WorkflowSettings.NODE_HEIGHT_DEFAULT
    };

    switch(type) {
        case Types.FlowCatagory.API:
            ret = {width: 150, height: 50};
        break;
        case Types.FlowCatagory.RULE:
            ret = {width: 150, height: 50};
        break;
    }

    return ret;
}

const getNodeFillColor = (type: Types.FlowCatagory): string => {
    let ret = WorkflowSettings.NODE_BACKGROUND_COLOR_DEFAULT;
    switch(type) {
        case Types.FlowCatagory.API:
            //changable fill color

        break;
        case Types.FlowCatagory.RULE:
            //changable fill color

        break;
    }

    return ret;
}

const getNodeShape = (type: Types.FlowCatagory): ReactNode => {
    const dimensions = getNodeSize(type);
    const w = dimensions.width;
    const h = dimensions.height;
    const fillColor = getNodeFillColor(type);

    const shapeStyles = {
        stroke: WorkflowSettings.NODE_OUTLINE_COLOR_DEFAULT,
        strokeWidth: 0,
        fill: fillColor
    }

    var shapeChilds: ReactNode;
    switch (type) {
        case Types.FlowCatagory.RULE: 
            shapeChilds = <rect 
                x={0} 
                y={0} 
                rx={6} 
                width={dimensions.width} 
                height={dimensions.height} 
                {...shapeStyles} 
            />;
        break;
        case Types.FlowCatagory.API:
            shapeChilds = <rect 
                x={0} 
                y={0} 
                rx={dimensions.height / 2} 
                width={dimensions.width} 
                height={dimensions.height}     
                {...shapeStyles} 
            />;
        break;
        case Types.FlowCatagory.DELAY:
            shapeChilds = <path 
                d={`M10,0 L${w - 10},0  L${w},${h / 2} L${w - 10},${h} L10,${h} L0,${h / 2} z`} 
                {...shapeStyles} 
            />;
        break;
        case Types.FlowCatagory.CHECK:
            shapeChilds = <path 
                d={`M0,${h / 2} L${w / 2},0 L${w},${h / 2} L${w / 2},${h} z`} 
                {...shapeStyles} 
            />;
        break;
        case Types.FlowCatagory.ACTION:
            shapeChilds = <path 
                d={`M0,${h} L${w * 0.25},0 L${w},0 L${w - w * 0.25},${h} z`} 
                {...shapeStyles} 
            />;
        break;
        case Types.FlowCatagory.MERGE:
            shapeChilds = (<>
                    <rect x={0} y={0} width={w} height={h} {...shapeStyles}></rect>
                    <path 
                        d={`M 10,0 L 10,${h} M ${w - 10}, 0  L ${w - 10}, ${h}`}  
                        fill="none" 
                        stroke="rgb(0, 0, 0)"
                    ></path>
                    <path 
                        d={`M 14,0 L 14,-10 M ${w - 14}, 0  L ${w - 14}, -10 M ${w / 2},${h} L ${w / 2}, ${h + 10} `} 
                        fill="white" 
                        stroke="#000"
                    ></path>
                </>);
        break;
        case Types.FlowCatagory.SPLIT:
            shapeChilds = (<>
                    <rect x={0} y={0} width={w} height={h} {...shapeStyles}></rect>
                    <path 
                        d={`M 10,0 L 10,${h} M ${w - 10}, 0  L ${w - 10}, ${h}`} 
                        fill="none" 
                        stroke="rgb(0, 0, 0)"
                    ></path>
                    <path 
                        d={`M 14,${h} L 14,${h + 10} M ${w - 14}, ${h}  L ${w - 14}, ${h + 10} M ${w / 2},0 L ${w / 2}, -10`}
                        fill="none" 
                        stroke="#000"
                    ></path>
                </>);
        break;
    }
    let ret = <svg style={{ display: 'block', overflow: 'visible' }} width={w} height={h}>
        {shapeChilds}
    </svg>
    return ret;
}

const isEdgeValidation = (
        connection: ReactflowRenderer.Connection, 
        type: Types.FlowCatagory,
        edgeIndex: number
    ) : boolean => 
{
    let bRet = true;

    return bRet;
}

const getNodeSources = (workNode: WorkNode<CWork>): ReactNode => {
    let ret: ReactNode;
    const nodeSourceCnt = workNode.getInstance().outputs;
    const nodeType = workNode.getInstance().type;
    
    const nodeEdges = workNode.getEdges();

    if(nodeSourceCnt == 0) return ret;
    const {width, height} = getNodeSize(nodeType);
    const offset = WorkflowSettings.Node_EDGE_POS_OFFSET;

    switch(nodeType) {
        case Types.FlowCatagory.API:
        case Types.FlowCatagory.RULE:
            if(nodeSourceCnt == 1) {
                const first = workNode.getFirstEdge();
                ret = <Handle type="source" position={Position.Bottom} id={first.id} />;
            } else {
                const first = workNode.getFirstEdge();
                const second = workNode.getSecondEdge();
                ret = <>
                    <Handle type="source" position={Position.Bottom} style={{left: offset}} id={first.id} />
                    <Handle type="source" position={Position.Bottom} style={{left: width - offset}} id={second.id} />
                </>;
            }
        break;
        case Types.FlowCatagory.CHECK:
            if(nodeSourceCnt == 1) {
                const first = workNode.getFirstEdge();
                ret = <Handle type="source" position={Position.Bottom} id={first.id}/>;
            } else {
                const first = workNode.getFirstEdge();
                const second = workNode.getSecondEdge();
                ret = <>
                    <Handle type="source" position={Position.Bottom} id={first.id} />
                    <Handle type="source" position={Position.Right} id={second.id} />
                </>;
            }
        break;
        case Types.FlowCatagory.DELAY:
            if(nodeSourceCnt == 1) {
                const first = workNode.getFirstEdge();
                ret = <Handle type="source" position={Position.Bottom} id={first.id} />;
            }
        break;
        case Types.FlowCatagory.MERGE:
            if(nodeSourceCnt == 1) {
                const first = workNode.getFirstEdge();
                ret = <Handle type="source" position={Position.Bottom} id={first.id} />;
            }
        break;
        case Types.FlowCatagory.SPLIT:
            if(nodeSourceCnt == 2) {
                const first = workNode.getFirstEdge();
                const second = workNode.getSecondEdge();
                ret = <>
                    <Handle type="source" position={Position.Bottom} style={{left: offset}} id={first.id} />
                    <Handle type="source" position={Position.Bottom} style={{left: width - offset}} id={second.id} />
                </>;
            }
        break;
        case Types.FlowCatagory.START:
            if(nodeSourceCnt == 1) {
                const first = workNode.getFirstEdge();
                ret = <>
                    <Handle type="source" position={Position.Bottom} id={first.id} />
                </>;
            }
        break;
    }
    return ret;
}

const getNodeTargets = (workNode: WorkNode<CWork>): ReactNode => {
    let ret: ReactNode;
    const nodeTargetCnt = workNode.getInstance().inputs;
    const nodeType = workNode.getInstance().type;

    if(nodeTargetCnt == 0) return ret;
    const {width, height} = getNodeSize(nodeType);
    const offset = WorkflowSettings.Node_EDGE_POS_OFFSET;

    switch(nodeType) {
        case Types.FlowCatagory.API:
        case Types.FlowCatagory.RULE:
            if(nodeTargetCnt == 1) {
                const first = workNode.getFirstEdge(true);
                ret = <Handle type="target" position={Position.Top} isValidConnection = {(connection) => isEdgeValidation(connection, nodeType, 0)} id={first.id} />;
            } else {
                const first = workNode.getFirstEdge(true);
                const second = workNode.getSecondEdge(true);
                ret = <>
                    <Handle type="target" position={Position.Top} style={{left: offset}} id={first.id} />
                    <Handle type="target" position={Position.Top} style={{left: width - offset}} id={second.id} />
                </>;
            }
        break;
        case Types.FlowCatagory.CHECK:
        case Types.FlowCatagory.DELAY:
            if(nodeTargetCnt == 1) {
                const first = workNode.getFirstEdge(true);
                ret = <Handle type="target" position={Position.Top} id={first.id} />;
            }
        break;
        case Types.FlowCatagory.MERGE:
            if(nodeTargetCnt == 2) {
                const first = workNode.getFirstEdge(true);
                const second = workNode.getSecondEdge(true);
                ret = <>
                    <Handle type="target" position={Position.Top} style={{left: offset}} id={first.id} />
                    <Handle type="target" position={Position.Top} style={{left: width - offset}} id={second.id} />
                </>;
            }
        break;
        case Types.FlowCatagory.SPLIT:
            if(nodeTargetCnt == 1) {
                const first = workNode.getFirstEdge(true);
                ret = <Handle type="target" position={Position.Top} id={first.id} />;
            }
        break;
        case Types.FlowCatagory.STOP:
            if(nodeTargetCnt == 1) {
                const first = workNode.getFirstEdge(true);
                ret = <Handle type="target" position={Position.Top} id={first.id} />;
            }
        break;
    }

    return ret;
}

const getNodeName = (WorkNode: WorkNode<CWork>): ReactNode => {
    const name = WorkNode.getInstance().name;
    return <>
        <div className={styles.label}>
            <div>
                {name}
            </div>
        </div>
    </>
}

//events

const BaseNodeComponent = (props: IBaseNodeComponentProps) => {

    const {
        type,
        ...other
    } = props;

    const nodeType = nodeTypeToEnum(type);
    const {width, height} = getNodeSize(nodeType);
    const workNode: WorkNode<CWork> = props.data;
    const workNodeData: CWork = workNode.getInstance();

    //states
    const [shape, setShape] = useState<ReactNode>();
    const [sources, setSources] = useState<ReactNode>();
    const [targets, setTargets] = useState<ReactNode>();
    const [label, setLabel] = useState<ReactNode>();
    
    useEffect(() => {
        const nodeShape = getNodeShape(nodeType);
        if(nodeShape) {
            setShape(nodeShape);
        }
        
        const nodeSources = getNodeSources(workNode);
        if(nodeSources) {
            setSources(nodeSources);
        }

        const nodeTargets = getNodeTargets(workNode);
        if(nodeTargets) {
            setTargets(nodeTargets);
        }

        const nodeLabel = getNodeName(workNode);
        console.log(nodeLabel);
        setLabel(nodeLabel);
    }, [nodeType]);

    return (
        <div className={styles.root}>
            {/* body */}
            {shape}
            {label}

            {/* sources */}
            {sources}

            {/* targets */}
            {targets}

        </div>
    );
};

export default BaseNodeComponent;