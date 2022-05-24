import React from 'react';
import cn from 'classnames';
import { IBaseUIProps } from '../../types';
import styles from './styles.module.scss';

import * as Types from "../../../../services/workflow/types";

export interface INodeProps extends IBaseUIProps {
  text: string;
  width: number;
  height: number;
  type: Types.FlowCatagory;
  color?: string;
  selected?: boolean;
  onDragStart?: Function;
}

const NodeItem = (props: INodeProps) => {
  const { text, type, width, height, color = '#000', selected = false, classes: { root, textContainer, textWrapper } = {}, onDragStart } = props;

  const shapeStyles = { fill: color, strokeWidth: selected ? 2 : 0, stroke: '#fff' };

  const renderShape = () => {
    switch (type) {
      case Types.FlowCatagory.API:
        return <rect x={0} y={0} rx={6} width={width} height={height} {...shapeStyles} />;
      case Types.FlowCatagory.RULE:
        return <rect x={0} y={0} rx={height / 2} width={width} height={height} {...shapeStyles} />;
      case Types.FlowCatagory.DELAY:
        return <path d={`M10,0 L${width - 10},0  L${width},${height / 2} L${width - 10},${height} L10,${height} L0,${height / 2} z`} {...shapeStyles} />;
      case Types.FlowCatagory.CHECK:
        return <path d={`M0,${height / 2} L${width / 2},0 L${width},${height / 2} L${width / 2},${height} z`} {...shapeStyles} />;
      case Types.FlowCatagory.ACTION:
        return <path d={`M0,${height} L${width * 0.25},0 L${width},0 L${width - width * 0.25},${height} z`} {...shapeStyles} />;
      case Types.FlowCatagory.MERGE:
        return (
          <>
            <rect x={0} y={0} width={width} height={height} {...shapeStyles}></rect>
            <path d={`M 10,0 L 10,${height} M ${width - 10}, 0  L ${width - 10}, ${height}`} fill="none" stroke="rgb(0, 0, 0)"></path>
            <path d={`M 14,0 L 14,-10 M ${width - 14}, 0  L ${width - 14}, -10 M ${width / 2},${height} L ${width / 2}, ${height + 10} `} fill="white" stroke="#000"></path>
          </>
        );
      case Types.FlowCatagory.SPLIT:
        return (
          <>
            <rect x={0} y={0} width={width} height={height} {...shapeStyles}></rect>
            <path d={`M 10,0 L 10,${height} M ${width - 10}, 0  L ${width - 10}, ${height}`} fill="none" stroke="rgb(0, 0, 0)"></path>
            <path d={`M 14,${height} L 14,${height + 10} M ${width - 14}, ${height}  L ${width - 14}, ${height + 10} M ${width / 2},0 L ${width / 2}, -10`} fill="none" stroke="#000"></path>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(styles.nodeWrapper, root)}
      style={{
        width: width,
        height: height
      }}
      onDragStart={(event) => onDragStart?.(event, JSON.stringify(props))}
      draggable
    >
      <svg style={{ display: 'block', overflow: 'visible' }} width={width} height={height}>
        {renderShape()}
        {/* <rect x={0} y={0} rx={6} width={width} height={height} fill={color} stroke="none" /> */}
      </svg>
      <div className={cn(styles.textContainer, textContainer)}>
        <div className={cn(styles.textWrapper, textWrapper)}>{text}</div>
      </div>
    </div>
  );
};

export default NodeItem;
