import { ITreeItemData } from "../components/NavTree/TreeComponent";

export const TREEVIEW_DATA: ITreeItemData[] = [
  {
    id: "1",
    name: "AWS_Workflow v2",
    type: "COLLECTION",
    children: [
      {
        id: "2",
        name: "Workflow",
        type: "FOLDER",
        children: [
          {
            id: "3",
            name: "get",
            type: "REQUEST",
            method: "GET",
            children: [
              { id: "4", name: "SUCCESS", type: "EXAMPLE", children: [] },
              { id: "5", name: "FAILED", type: "EXAMPLE", children: [] },
            ],
          },
          {
            id: "6",
            name: "store",
            type: "REQUEST",
            method: "POST",
            children: [],
          },
          {
            id: "7",
            name: "insert",
            type: "REQUEST",
            method: "PUT",
            children: [],
          },
          {
            id: "8",
            name: "update",
            type: "REQUEST",
            method: "PATCH",
            children: [],
          },
          {
            id: "9",
            name: "delete",
            type: "REQUEST",
            method: "DEL",
            children: [],
          },
        ],
      },
      {
        id: "10",
        name: "apiMgmt",
        type: "FOLDER",
        children: [
          { id: "11", name: "Workflow", type: "FOLDER", children: [] },
        ],
      },
      {
        id: "12",
        name: "Mockapi",
        type: "FOLDER",
        children: [
          { id: "13", name: "Workflow", type: "FOLDER", children: [] },
        ],
      },
    ],
  },
  {
    id: "14",
    name: "AWS_Workflow v3",
    type: "COLLECTION",
    children: [{ id: "15", name: "Mock", type: "FOLDER", children: [] }],
  },
];
