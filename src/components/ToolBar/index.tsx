import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import NodeItem from '../Based/Nodes/NodeItem';
import Button from '../Based/Button';
import styles from './styles.module.scss';
import * as Types from '../../services/workflow/types';

const ToolBar = () => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, data: string) => {
    event.dataTransfer.setData('reactflow/type', data);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleRun = () => {};

  return (
    <aside>
      <div className={styles.toolbar}>
        <div className={styles.description}>You can drag these nodes to the pane on the right.</div>
        <NodeItem
          text="CALL API"
          classes={{ root: styles.mainRoot }}
          width={120}
          height={50}
          type={Types.FlowCatagory.API}
          color="#668de3"
          onDragStart={(event: React.DragEvent<HTMLDivElement>, type: string) => handleDragStart(event, type)}
        />
        <NodeItem
          text="CALL RULE"
          classes={{ root: styles.mainRoot }}
          width={120}
          height={50}
          type={Types.FlowCatagory.RULE}
          color="#00d7ca"
          onDragStart={(event: React.DragEvent<HTMLDivElement>, type: string) => handleDragStart(event, type)}
        />
        <NodeItem
          text="WAIT"
          classes={{ root: styles.mainRoot }}
          width={120}
          height={50}
          type={Types.FlowCatagory.DELAY}
          color="#00d7ca"
          onDragStart={(event: React.DragEvent<HTMLDivElement>, type: string) => handleDragStart(event, type)}
        />
        <NodeItem
          text="CHECK"
          classes={{ root: styles.mainRoot }}
          width={120}
          height={50}
          type={Types.FlowCatagory.CHECK}
          color="#00d7ca"
          onDragStart={(event: React.DragEvent<HTMLDivElement>, type: string) => handleDragStart(event, type)}
        />
        <NodeItem
          text="ACTION"
          classes={{ root: styles.mainRoot }}
          width={120}
          height={50}
          type={Types.FlowCatagory.ACTION}
          color="#00d7ca"
          onDragStart={(event: React.DragEvent<HTMLDivElement>, type: string) => handleDragStart(event, type)}
        />
        <NodeItem
          text="MERGE"
          classes={{ root: cn(styles.mergeRoot, styles.mainRoot) }}
          width={120}
          height={50}
          type={Types.FlowCatagory.MERGE}
          color="#00d7ca"
          onDragStart={(event: React.DragEvent<HTMLDivElement>, type: string) => handleDragStart(event, type)}
        />
        <NodeItem
          text="SPLIT"
          classes={{ root: cn(styles.splitRoot, styles.mainRoot) }}
          width={120}
          height={50}
          type={Types.FlowCatagory.SPLIT}
          color="#00d7ca"
          onDragStart={(event: React.DragEvent<HTMLDivElement>, type: string) => handleDragStart(event, type)}
        />
      </div>
      <div className={styles.controlPanel}>{/* <Button text="Run" onClick={handleRun} /> */}</div>
    </aside>
  );
};

export default ToolBar;
