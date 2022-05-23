import { ITreeItemData } from '../../components/NavTree/TreeComponent';

export const parseFolderList = (folderInfo: any): ITreeItemData[] => {
  return folderInfo.map((item: any) => {
    let tid: ITreeItemData = { id: '', name: '', method: '', children: [] };
    tid.id = item.itemId;
    tid.name = item.itemName;
    tid.type = item.itemCatagory;
    tid.method = item?.method || '';
    if (item.children && Array.isArray(item.children)) tid.children = parseFolderList(item.children);
    return tid;
  });
};
