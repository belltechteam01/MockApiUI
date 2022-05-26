import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import ReactFlow from 'react-flow-renderer';
import * as ReactflowRenderer from 'react-flow-renderer';

//interfaces
export interface IEdgeComponentProps {

}

//events

const EdgeComponent = (props: IEdgeComponentProps) => {
    const {
        ...other
    } = props;

    return (
        <div className={styles.root}>

        </div>
    );
};

export default EdgeComponent;