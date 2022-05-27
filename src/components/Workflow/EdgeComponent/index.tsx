import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import * as ReactflowRenderer from 'react-flow-renderer';
import styles from './styles.module.scss';

//interfaces
export interface IEdgeComponentProps {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition?: ReactflowRenderer.Position;
  targetPosition?: ReactflowRenderer.Position;
  style?: CSSProperties;
  data?: any;
  markerEnd?: string;
}

//events

const EdgeComponent = (props: IEdgeComponentProps) => {
  const { id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, data, markerEnd } = props;
  const edgePath = ReactflowRenderer.getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });

  return (
    <>
      <path id={id} style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
      <text>
        <textPath href={`#${id}`} style={{ fontSize: '12px' }} startOffset="50%" textAnchor="middle">
          {data.text}
        </textPath>
      </text>
    </>
  );
  // const {
  //     ...other
  // } = props;
  // return (
  //     <div className={styles.root}>
  //     </div>
  // );
};

export default EdgeComponent;
