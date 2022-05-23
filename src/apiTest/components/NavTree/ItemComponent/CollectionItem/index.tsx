import React from 'react';

import { IconTreeItem, IconTreeItemProps } from '../BaseItem';

export interface CollectionItemProps extends IconTreeItemProps {}
const menus = [
  { id: 1, name: 'Add Request' },
  { id: 2, name: 'Add folder' },
  { id: 3, name: 'Rename' },
  // {id:4, name:"Duplicate"},
  { id: 5, name: 'Delete' }
];
export default function CollectionItem(props: CollectionItemProps) {
  return (
    <div className="root">
      <IconTreeItem {...props} menus={menus} />
    </div>
  );
}
