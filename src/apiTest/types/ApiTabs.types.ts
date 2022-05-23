import { ReactNode } from "react";

export interface iApiTabsProps {
  tabs?: iApiTabProps[];
  activeTab?: iApiTabProps;
  setActivedTab?: (data: iApiTabProps) => void;
}

export interface iApiTabProps {
  name?: React.ReactNode;
  id?: number;
  value?: string;
}

export interface TabPanelProps {
  children?: ReactNode;
  dir?: string;
  index: number;
  value: number;
}
