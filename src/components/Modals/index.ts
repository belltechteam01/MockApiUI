export enum ModalType {
  Response = 1,
  Request = 2,
  StatusCode = 3
}

export interface IModalProps {
  id: string;
  type: ModalType;
  attribId: string;
  data: any;
  onClose: Function;
}
