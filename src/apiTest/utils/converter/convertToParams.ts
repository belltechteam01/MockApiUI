export const toReqAuth = (auth: any) => {
  const keys = Object.keys(auth);
  let tempAuth = {
    reqAuthUrl: "",
    reqClientId: "",
    reqClientSecret: "",
    reqScope: "",
    reqType: "noAuth",
  };
  if (keys.length > 0) {
    tempAuth = {
      reqAuthUrl: auth?.authUrl ?? "",
      reqClientId: auth?.clientId ?? "",
      reqClientSecret: auth?.clientSecret ?? "",
      reqScope: auth?.scope ?? "",
      reqType: auth?.type ?? "noAuth",
    };
  }
  return tempAuth;
};

export const toReqBody = (body: any) => {
  const keys = Object.keys(body);
  let tempBody = {
    reqData: "",
    reqType: "none",
    reqFormat: "json",
  };
  if (keys.length > 0) {
    tempBody = {
      reqData: body?.data ?? "",
      reqType: body?.type ?? "none",
      reqFormat: body?.format ?? "json",
    };
  }
  return tempBody;
};

export const toReqParams = (params: any) => {
  const filterParams = params.filter((param: any) => param.key || param.value);

  return filterParams.map((param: any) => {
    return {
      reqFieldName: param?.fieldName ?? "",
      reqIsChecked: param?.isChecked ?? false,
      reqIsConstant: param?.isConstant ?? false,
      reqKey: param?.key ?? "",
      reqValue: param?.value ?? "",
    };
  });
};
