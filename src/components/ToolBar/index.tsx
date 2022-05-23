import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import NodeItem from '../Based/Nodes/NodeItem';
import Button from '../Based/Button';
import { Workflow } from '../../utils/test03';
import styles from './styles.module.scss';

const ToolBar = () => {
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [workflowState, setWorkflowState] = useState(null);

  useEffect(() => {
    if (workflow == null) {
      setWorkflow(new Workflow('1', 'parent'));
      console.log('first create of workflow');
    } else {
      console.log('workflow updated');
    }
  }, [workflow]);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, data: string) => {
    event.dataTransfer.setData('application/reactflow', data);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleRun = () => {
    console.log(workflow);
    if (workflow) {
      workflow.add();
      workflow.add();
      workflow.add();

      workflow.moveto(1);

      workflow.excute();
    }
  };

  return (
    <aside>
      <div className={styles.toolbar}>
        <div className={styles.description}>You can drag these nodes to the pane on the right.</div>
        <NodeItem
          text="CALL API"
          classes={{ root: styles.mainRoot }}
          width={120}
          height={50}
          type="CALL_API"
          color="#668de3"
          onDragStart={(event: React.DragEvent<HTMLDivElement>, type: string) => handleDragStart(event, type)}
        />
        <NodeItem
          text="CALL RULE"
          classes={{ root: styles.mainRoot }}
          width={120}
          height={50}
          type="CALL_RULE"
          color="#00d7ca"
          onDragStart={(event: React.DragEvent<HTMLDivElement>, type: string) => handleDragStart(event, type)}
        />
        <NodeItem
          text="WAIT"
          classes={{ root: styles.mainRoot }}
          width={120}
          height={50}
          type="WAIT"
          color="#00d7ca"
          onDragStart={(event: React.DragEvent<HTMLDivElement>, type: string) => handleDragStart(event, type)}
        />
        <NodeItem
          text="CHECK"
          classes={{ root: styles.mainRoot }}
          width={80}
          height={50}
          type="CHECK"
          color="#00d7ca"
          onDragStart={(event: React.DragEvent<HTMLDivElement>, type: string) => handleDragStart(event, type)}
        />
        <NodeItem
          text="ACTION"
          classes={{ root: styles.mainRoot }}
          width={120}
          height={50}
          type="ACTION"
          color="#00d7ca"
          onDragStart={(event: React.DragEvent<HTMLDivElement>, type: string) => handleDragStart(event, type)}
        />
        <NodeItem
          text="MERGE"
          classes={{ root: cn(styles.mergeRoot, styles.mainRoot) }}
          width={120}
          height={50}
          type="MERGE"
          color="#00d7ca"
          onDragStart={(event: React.DragEvent<HTMLDivElement>, type: string) => handleDragStart(event, type)}
        />
        <NodeItem
          text="SPLIT"
          classes={{ root: cn(styles.splitRoot, styles.mainRoot) }}
          width={120}
          height={50}
          type="SPLIT"
          color="#00d7ca"
          onDragStart={(event: React.DragEvent<HTMLDivElement>, type: string) => handleDragStart(event, type)}
        />
      </div>
      <div className={styles.controlPanel}>
        <Button text="Run" onClick={handleRun} />
      </div>
    </aside>
  );
};

export default ToolBar;
