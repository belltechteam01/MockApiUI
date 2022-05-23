export const toReqAxiosParams = (params: any) => {
  const filterParams = params.filter(
    (param: any) => param.isChecked && (param.key || param.value)
  );

  let tempParams: any = {};
  filterParams.map((item: any) => (tempParams[item.key] = item.value));
  return tempParams;
};

export const toReqAxiosAuth = (params: any) => {
  return params;
};

export const toReqAxiosBody = (params: any) => {
  return params.type === "raw" ? JSON.parse(params.data) : {};
};
