export const API_LIST = [
  { label: 'getUsers', value: '123' },
  { label: 'getRoles', value: '124' }
];

export const API_DETAIL_LIST = [
  {
    id: '123',
    label: 'getUsers',
    requestData: [
      { fieldName: 'companyId', isConstant: true, path: '' },
      { fieldName: 'roleId', isConstant: false, path: '' }
    ],
    responseData: []
  },
  { id: '124', label: 'getRoles', responseData: {}, requestData: {} }
];
