import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { NODE_TYPES } from '../../utils/constant';

interface IShapeData {
  type: string;
  width: number;
  height: number;
  color: string;
  selected: boolean;
}

interface IShapeNode {
  data: any;
  selected: boolean;
}

const handleStyle = { opacity: 0 };

function useShape({ type, width, height, color = '#9ca8b3', selected }: IShapeData) {
  const shapeStyles = { fill: color, strokeWidth: selected ? 2 : 0, stroke: '#bbb' };

  switch (type) {
    case NODE_TYPES.CALL_API:
      return <rect x={0} y={0} rx={6} width={width} height={height} {...shapeStyles} />;
    case NODE_TYPES.CALL_RULE:
      return <rect x={0} y={0} rx={height / 2} width={width} height={height} {...shapeStyles} />;
    case NODE_TYPES.WAIT:
      return <path d={`M10,0 L${width - 10},0  L${width},${height / 2} L${width - 10},${height} L10,${height} L0,${height / 2} z`} {...shapeStyles} />;
    case NODE_TYPES.CHECK:
      return <path d={`M0,${height / 2} L${width / 2},0 L${width},${height / 2} L${width / 2},${height} z`} {...shapeStyles} />;
    case NODE_TYPES.ACTION:
      return <path d={`M0,${height} L${width * 0.25},0 L${width},0 L${width - width * 0.25},${height} z`} {...shapeStyles} />;
    case NODE_TYPES.MERGE:
      return (
        <>
          <rect x={0} y={0} width={width} height={height} {...shapeStyles}></rect>
          <path d={`M 10,0 L 10,${height} M ${width - 10}, 0  L ${width - 10}, ${height}`} fill="none" stroke="rgb(0, 0, 0)"></path>
          <path d={`M 14,0 L 14,-10 M ${width - 14}, 0  L ${width - 14}, -10 M ${width / 2},${height} L ${width / 2}, ${height + 10} `} fill="white" stroke="#000"></path>
        </>
      );
    case NODE_TYPES.SPLIT:
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
}

function ShapeNode({ data, selected }: IShapeNode) {
  console.log('data===>', data);
  const width = data?.width || 100;
  const height = data?.height || 100;
  const shape = useShape({
    type: data?.type,
    width,
    height,
    color: data?.color,
    selected
  });

  return (
    <div style={{ position: 'relative' }}>
      <Handle id="top" style={handleStyle} position={Position.Top} type="source" />
      <Handle id="right" style={handleStyle} position={Position.Right} type="source" />
      <Handle id="bottom" style={handleStyle} position={Position.Bottom} type="source" />
      <Handle id="left" style={handleStyle} position={Position.Left} type="source" />
      <svg style={{ display: 'block', overflow: 'visible' }} width={width} height={height}>
        {shape}
      </svg>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      >
        <div
          style={{
            fontFamily: 'monospace',
            fontWeight: 'bold',
            color: 'white',
            fontSize: 12
          }}
        >
          {data?.label}
        </div>
      </div>
    </div>
  );
}

export default ShapeNode;
