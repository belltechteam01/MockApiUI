import { HeadCell } from '../../common/components/Based/InputTable/InputTable.types';

export const REQ_HEAD_CELLS: HeadCell[] = [
  {
    id: 'key',
    name: 'key',
    numeric: false,
    checkable: false,
    disablePadding: false,
    label: 'KEY'
  },
  {
    id: 'value',
    name: 'value',
    numeric: false,
    checkable: false,
    disablePadding: false,
    label: 'VALUE'
  },
  {
    id: 'isConstant',
    name: 'isConstant',
    numeric: false,
    checkable: true,
    disablePadding: false,
    label: 'IS_CONSTANT'
  }
];

export const RES_HEAD_CELLS: HeadCell[] = [
  {
    id: 'key',
    name: 'key',
    numeric: false,
    disablePadding: false,
    label: 'KEY'
  },
  {
    id: 'value',
    name: 'value',
    numeric: false,
    disablePadding: false,
    label: 'VALUE'
  }
];

export const INIT_REQUEST_DATA = {
  reqApiName: '',
  reqApiUrl: '',
  reqMethod: '',
  reqAuth: {
    reqAuthUrl: '',
    reqClientId: '',
    reqClientSecret: '',
    reqScope: '',
    reqType: 'noAuth'
  },
  reqBody: {
    reqData: '',
    reqType: 'none',
    reqFormat: 'json'
  },
  reqHeaders: [],
  reqParams: []
};

export const INIT_RESPONSE_DATA = {
  reqBody: {
    reqData: '',
    reqType: 'raw',
    reqFormat: 'json'
  },
  reqHeaders: []
};

export const REQ_URLS = {
  addCollectionUrl: `/test/api-collection/v101`,
  deleteCollectionUrl: `/test/api-collection/v101`,
  folderUrl: `/test/api-folder-detail/v101`,
  folderAllUrl: `/test/api-folder/v101`,
  addFolderUrl: `/test/api-folder/v101`,
  updateFolderUrl: `/test/api-folder/v101`,
  deleteFolderUrl: `/test/api-folder/v101`,
  duplicateFolderUrl: `/test/api-request-duplicate/v101`,

  fileUrl: `/test/api-engine-details/v101`,
  fileAllUrl: `/test/api-folder-file/v101`,
  addFileUrl: `/test/api-request/v101`,
  updateFileUrl: `/test/api-request/v101`,
  deleteFileUrl: `/test/api-folder-file/v101`,
  duplicateFileUrl: `/test/api-request-duplicate/v101`,

  getExampleUrl: `/test/api-example/v101`,
  addExampleUrl: `/test/api-example/v101`,
  updateExampleUrl: `/test/api-example/v101`,
  deleteExampleUrl: `/test/api-example-delete/v101`,
  duplicateExampleUrl: `/test/api-example-duplicate/v101`
};
