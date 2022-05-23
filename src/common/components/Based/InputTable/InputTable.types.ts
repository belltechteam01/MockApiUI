import { IBaseUIProps, fType } from "./../types";
export interface Data {
  key: string;
  value: string;
  description: string;
}

export interface HeadCell {
  disablePadding?: boolean;
  id: string;
  label: string;
  numeric?: boolean;
  checkable?: boolean;
  name: string;
}

export interface EnhancedTableProps {
  headCells: HeadCell[];
  tableData?: any[];
}

export interface IInputTableProps extends EnhancedTableProps, IBaseUIProps {
  isBasic?: boolean;
  isLink?: boolean;
  onRowDelete?: fType;
}
