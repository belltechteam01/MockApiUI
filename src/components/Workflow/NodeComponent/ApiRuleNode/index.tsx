import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import ReactFlow from 'react-flow-renderer';
import BaseNodeComponent, { IBaseNodeComponentProps } from "../BaseNode";

//interfaces
export interface IRuleNodeComponentProps extends IBaseNodeComponentProps {

}

//events

export const RuleNodeComponent = (props: IRuleNodeComponentProps) => {
    const {
        ...other
    } = props;

    return (
        <BaseNodeComponent {...props} />
    );
};

export default RuleNodeComponent;
