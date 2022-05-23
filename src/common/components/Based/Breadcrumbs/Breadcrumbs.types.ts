import { IBaseUIProps } from '../types';

export interface IBreadcrumbsItem {
  label: string;
  link?: string;
  info?: ISelectedField;
}

export interface ISelectedField {
  id?: string;
  type?: string;
  name: string;
}

export interface IBreadcrumbsProps extends IBaseUIProps {
  items: IBreadcrumbsItem[];
}
