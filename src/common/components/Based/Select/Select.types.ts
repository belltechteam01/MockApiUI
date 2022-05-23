import { IBaseUIProps } from "../types";

export interface ISelectProps extends IBaseUIProps {
  label?: string;
  items: ISelectItem[];
  value?: ISelectItem;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

export declare interface ISelectItem {
  label: string;
  value: string;
}
