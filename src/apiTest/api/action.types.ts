export interface IActionsResponseProps {
  getFolders?: Function;
  isLoading?: boolean;
  // loadingId?: string;
  error?: string | null;
  folders?: any;
  resData?: any;
  getFolderAll?: Function;
  addCollection?: Function;
  deleteCollection?: Function;
  addFolder?: Function;
  updateFolder?: Function;
  deleteFolder?: Function;
  duplicateFolder?: Function;

  apiDetail?: any;
  getFile?: Function;
  addRequest?: Function;
  updateRequest?: Function;
  deleteRequest?: Function;
  duplicateRequest?: Function;

  getExample?: Function;
  addExample?: Function;
  updateExample?: Function;
  deleteExample?: Function;
  duplicateExample?: Function;

  getMethod?: any;
  postMethod?: any;
  putMethod?: any;
  patchMethod?: any;
  deleteMethod?: any;
  sendRequest?: any;
}

export type IFolderInfo = {};

export type IFolderListResponse = {
  employmentType: string;
  workAddress: {
    address1: string;
  };
  payType: string;
};

export type IFolderResponse = {};

export type IApiInfo = {};

export type IApiResponse = {};
