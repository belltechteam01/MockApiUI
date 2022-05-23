export const convertToResHeaders = (resHeaders: any) => {
  const keys = Object.keys(resHeaders);
  return keys.map((item) => {
    return { key: item, value: resHeaders[item] };
  });
};
