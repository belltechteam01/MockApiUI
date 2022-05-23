import React from 'react';

import { IconTreeItem, IconTreeItemProps } from '../BaseItem';

export interface FolderItemProps extends IconTreeItemProps {}

const menus = [
  { id: 1, name: 'Add Request' },
  { id: 2, name: 'Add folder' },
  { id: 3, name: 'Rename' },
  // { id: 4, name: "Duplicate" },
  { id: 5, name: 'Delete' }
];

export default function FolderItem(props: FolderItemProps) {
  return (
    <div className="root">
      <IconTreeItem {...props} menus={menus}></IconTreeItem>
    </div>
  );
}
