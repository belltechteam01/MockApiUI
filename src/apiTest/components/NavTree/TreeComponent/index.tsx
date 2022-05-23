import React from 'react';

import TreeView, { SingleSelectTreeViewProps } from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ItemComponent from '../ItemComponent';

export interface INode {
  id: string;
  name: string;
  type?: string;
}

export interface ITreeItemData {
  id: string;
  name: string;
  type?: string;
  method?: string;
  children: ITreeItemData[];
}

export interface TreeComponentProps extends SingleSelectTreeViewProps {
  treeItems: ITreeItemData[];
  selectedNodeId: string;
  isLoading?: boolean;
  onRename?: (nodeId: string, value: string) => void;
  onChangeSelected?: (nodeId: string) => void;
  onMenuClick?: (nodeId: string, menuName: string) => void;
}

export function TreeComponent(props: TreeComponentProps) {
  const { treeItems, selectedNodeId, isLoading, onRename, onChangeSelected, onMenuClick, ...others } = props;

  const handleSelected = (nodeIds: string) => {
    if (onChangeSelected) onChangeSelected(nodeIds);
  };

  const handleRename = (nodeId: string, value: string) => {
    if (onRename) onRename(nodeId, value);
  };

  const handleMenuClick = (nodeId: string, value: string) => {
    if (onMenuClick) onMenuClick(nodeId, value);
  };

  const getTreeItemsFromData = (treeItems: ITreeItemData[]) => {
    return treeItems.map((treeItemData) => {
      let children: JSX.Element[] | undefined = undefined;
      if (treeItemData.children && treeItemData.children.length > 0) {
        children = getTreeItemsFromData(treeItemData.children);
      }
      return (
        <ItemComponent
          key={treeItemData.id}
          nodeId={treeItemData.id}
          name={treeItemData.name}
          type={treeItemData.type ?? 'COLLECTION'}
          method={treeItemData.method ?? 'GET'}
          isLoading={isLoading}
          children={children}
          onRename={(nodeId: string, value: string) => handleRename(nodeId, value)}
          onChangeSelected={(nodeId: string) => handleSelected(nodeId)}
          onMenuClick={(nodeId: string, menuName: string) => handleMenuClick(nodeId, menuName)}
        />
      );
    });
  };

  return (
    <TreeView
      aria-label="icon expansion"
      defaultExpanded={['1']}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      defaultEndIcon={<></>}
      // expanded={expanded}
      // onNodeToggle={handleChange}
      selected={selectedNodeId}
      sx={{ flexGrow: 1 }}
      {...others}
    >
      {getTreeItemsFromData(treeItems)}
    </TreeView>
  );
}
