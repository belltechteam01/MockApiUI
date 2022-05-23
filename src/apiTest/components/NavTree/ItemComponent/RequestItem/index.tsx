import React from 'react';

import { IconTreeItem, IconTreeItemProps } from '../BaseItem';

export interface RequestItemProps extends IconTreeItemProps {}

const menus = [
  { id: 1, name: 'Add Example' },
  { id: 2, name: 'Rename' },
  { id: 3, name: 'Duplicate' },
  { id: 4, name: 'Delete' }
];

export default function RequestItem(props: RequestItemProps) {
  return (
    <div className="root">
      <IconTreeItem {...props} menus={menus}></IconTreeItem>
    </div>
  );
}
