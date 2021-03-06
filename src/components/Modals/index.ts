export enum ModalType {
  Response = 1,
  Request = 2,
  StatusCode = 3,
  TestData = 4
}

export interface IModalProps {
  id: string;
  type: ModalType;
  data: any;
  onClose: Function;
  valuePath?: string;
}
