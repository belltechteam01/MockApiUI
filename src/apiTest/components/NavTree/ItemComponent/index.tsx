import React from 'react';

import CollectionItem, { CollectionItemProps } from './CollectionItem';
import FolderItem from './FolderItem';
import RequestItem from './RequestItem';
import ExampleItem from './ExampleItem';

export interface ItemComponentProps extends CollectionItemProps {
  type: string;
  method?: string;
}

export default function ItemComponent(props: ItemComponentProps) {
  const { type, method } = props;

  return (
    <div className="root">
      {type === 'COLLECTION' && <CollectionItem {...props} />}
      {type === 'FOLDER' && <FolderItem {...props} iconType="FOLDER" />}
      {type === 'REQUEST' && <RequestItem {...props} iconType={`REQUEST__${method}`} />}
      {type === 'EXAMPLE' && <ExampleItem {...props} iconType="EXAMPLE" />}
    </div>
  );
}
