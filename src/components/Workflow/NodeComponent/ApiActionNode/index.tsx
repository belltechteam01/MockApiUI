import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import ReactFlow from 'react-flow-renderer';
import BaseNodeComponent, { IBaseNodeComponentProps } from "../BaseNode";

//interfaces
export interface IActionNodeComponentProps extends IBaseNodeComponentProps {

}

//events

export const ActionNodeComponent = (props: IActionNodeComponentProps) => {
    const {
        ...other
    } = props;

    return (
        <BaseNodeComponent {...props} />
    );
};

export default ActionNodeComponent;
