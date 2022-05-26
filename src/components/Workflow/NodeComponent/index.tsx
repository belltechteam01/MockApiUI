import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import * as ReactflowRenderer from 'react-flow-renderer';

import ApiCallNode from "./ApiCallNode";
import ApiRuleNode from "./ApiRuleNode";
import ApiDelayNode from "./ApiDelayNode";
import ApiActionNode from "./ApiActionNode";
import ApiCheckNode from "./ApiCheckNode";
import ApiMergeNode from "./ApiMergeNode";
import ApiSplitNode from "./ApiSplitNode";

import { CWorkflow } from "services/workflow";
import {IBaseNodeComponentProps} from "./BaseNode";
import * as Types from "services/workflow/types";

//interfaces
export interface INodeComponentProps {
    // id: string;
    workflow: CWorkflow;
    // theme?: NodeUITypes.NodeTheme;
}

//functions
export const getNodeTypes = (workflow: CWorkflow): Object => {
    let ret = {};

    ret = {
        ApiCallNode: ApiCallNode,
        ApiRullNode: ApiRuleNode,
    };

    return ret;
}

const getNodeData = (id: string, workflow: CWorkflow):  IBaseNodeComponentProps | null => {
    let nodeData = workflow.worklist.get(id);
    if(nodeData) {
        // const workModel = nodeData.getInstance();
        const workModel = nodeData;
        let ret: IBaseNodeComponentProps = {
            id: workModel.id,
            position: { x: workModel.getInstance().xPos, y: workModel.getInstance().yPos },
            type: Types.FlowCatagory[workModel.getInstance().type],            
            data: workModel,
            
        };

        return ret;
    }

    return null;
}

const getNodeCatagory = (id: string, workflow: CWorkflow): Types.FlowCatagory => {
    let nodeData = workflow.worklist.get(id);
    if(nodeData) {
        const workModel = nodeData.getInstance();
        return workModel.type;
    }

    return Types.FlowCatagory.START;
}
//events

const NodeComponent = (props: ReactflowRenderer.NodeProps<CWorkflow>) => {
    const {
        id,
        data,
        ...other
    } = props;

    const workflow = data;
    
    const nodeCategory = getNodeCatagory(id, workflow);
    const nodeData = getNodeData(id, workflow);

    return (
        <div className="root">
            { nodeData && nodeCategory === Types.FlowCatagory.API &&
                <ApiCallNode {...nodeData} />
            }
            { nodeData && nodeCategory === Types.FlowCatagory.RULE &&
                <ApiRuleNode {...nodeData} />
            }
            { nodeData && nodeCategory === Types.FlowCatagory.CHECK &&
                <ApiCheckNode {...nodeData} />
            }
            { nodeData && nodeCategory === Types.FlowCatagory.DELAY &&
                <ApiDelayNode {...nodeData} />
            }
            { nodeData && nodeCategory === Types.FlowCatagory.MERGE &&
                <ApiMergeNode {...nodeData} />
            }
            { nodeData && nodeCategory === Types.FlowCatagory.SPLIT &&
                <ApiSplitNode {...nodeData} />
            }
            { nodeData && nodeCategory === Types.FlowCatagory.ACTION &&
                <ApiActionNode {...nodeData} />
            }
        </div>
    );
};

export default NodeComponent;