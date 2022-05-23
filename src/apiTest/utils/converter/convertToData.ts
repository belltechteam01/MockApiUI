export const toTableData = (items: any[] | undefined) => {
  if (typeof items === "undefined") return [];
  return items.map((item) => {
    let data = { key: "", value: "", isChecked: false, isConstant: false };
    data.key = item?.reqKey;
    data.value = item?.reqValue;
    data.isChecked = item?.reqIsChecked;
    data.isConstant = item?.reqIsConstant;
    return data;
  });
};

export const toAuthData = (auth: any) => {
  const type = auth?.reqType !== "noAuth" ? "oauth2" : "noAuth";
  let data: any = {};
  if (auth?.type !== "noAuth") {
    data.authUrl = auth?.reqAuthUrl || "";
    data.clientId = auth?.reqClientId || "";
    data.clientSecret = auth?.reqClientSecret || "";
    data.scope = auth?.reqScope || "";
  }
  data.type = type;
  return data;
};

export const toBodyData = (body: any) => {
  let data: any = {};
  if (body?.reqType === "raw") {
    data.data = body?.reqData;
    data.format = body?.reqFormat || "json";
  }
  data.type = body?.reqType;
  return data;
};
