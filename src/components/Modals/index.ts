export enum ModalType {
  Response = 1,
  Request = 2,
  StatusCode = 3
}

export interface IModalProps {
  id: string;
  flowStepId: string;
  selectedId: string;
  data: any;
  onClose: Function;
}
