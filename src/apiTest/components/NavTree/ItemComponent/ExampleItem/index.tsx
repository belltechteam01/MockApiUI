import React from 'react';

import { IconTreeItem, IconTreeItemProps } from '../BaseItem';

export interface ExampleItemProps extends IconTreeItemProps {}
const menus = [
  { id: 1, name: 'Rename' },
  { id: 2, name: 'Duplicate' },
  { id: 3, name: 'Delete' }
];
export default function ExampleItem(props: ExampleItemProps) {
  return (
    <div className="root">
      <IconTreeItem {...props} menus={menus}></IconTreeItem>
    </div>
  );
}
