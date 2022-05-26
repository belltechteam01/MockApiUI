import * as ReactflowRenderer from 'react-flow-renderer';
import { CSSProperties } from "@emotion/serialize";

export enum NodeTheme {
    default,
}

export enum NodeCategory {
    default,
    input,
    output,
    group
}

export interface INodeData {
    label: string;
}

export interface INodeOptions {
    id                  : string;
    position            : ReactflowRenderer.XYPosition;
    data                : INodeData;

    type?               : NodeCategory;
    targetPosition?     : ReactflowRenderer.Position;
    sourcePosition?     : ReactflowRenderer.Position;
    parentNode?         : string;
    expandParent?       : boolean;
    extent?             : Array<number> | string;   //set it to 'parent'
    selected?           : boolean;                  //If true, the node is selected
    hidden?             : boolean;                  //If true, the node will not be rendered
    draggable?          : boolean;                  //default is draggable
    connectable?        : boolean;                  //default is connectable
    selectable?         : boolean;                  //default is selectable
    dragHandle?         : string;                   //selector for specifying an element as a drag handle
    style?              : CSSProperties;
    className?          : string;
    zIndex?             : number;                   //default 0
}
