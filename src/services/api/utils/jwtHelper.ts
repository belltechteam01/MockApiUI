/* 
@Author: Star
@Date: 2022-04-19 02:34:13
@Last Modified by:   Star
@Last Modified time: 2022-04-19 02:34:13
This module is used to verify JWT Bearer Token
*/

function decode(token: any) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
}
export const verifyToken = (token: any) => {
  if (!token) return false;
  try {
    const { exp } = decode(token);
    if (Date.now() >= exp * 1000) {
      return false;
    }
  } catch (err) {
    return false;
  }
  return true;
};
