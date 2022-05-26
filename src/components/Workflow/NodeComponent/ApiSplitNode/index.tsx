import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import ReactFlow from 'react-flow-renderer';
import BaseNodeComponent, { IBaseNodeComponentProps } from "../BaseNode";

//interfaces
export interface ISplitNodeComponentProps extends IBaseNodeComponentProps {

}

//events

export const SplitNodeComponent = (props: ISplitNodeComponentProps) => {
    const {
        ...other
    } = props;
    return (
        <BaseNodeComponent {...props} />
    );
};

export default SplitNodeComponent;
