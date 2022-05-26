import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import ReactFlow from 'react-flow-renderer';
import BaseNodeComponent, { IBaseNodeComponentProps } from "../BaseNode";

//interfaces
export interface IDelayNodeComponentProps extends IBaseNodeComponentProps {

}

//events

export const DelayNodeComponent = (props: IDelayNodeComponentProps) => {
    const {
        ...other
    } = props;

    return (
        <BaseNodeComponent {...props} />
    );
};

export default DelayNodeComponent;
