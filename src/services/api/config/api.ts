/*
-- @Author: Star
@Date: 2022-04-07 15:04:26
@Last Modified by:   Star
@Last Modified time: 2022-04-13 15:32:26
This script is used to define the configruation for calling APIs
--*/

let configUrl: any;

configUrl = {
  
  /* Live Sever */
  //baseURL: "http://123.123.123.123/"

  /*  Local Server  */
  baseURL: "https://smsjourney.justotp.com",
  tokenURL: "https://auth.justotp.com/oauth2/token"

};
// console.log("baseURL==>", configUrl.baseURL);

export default configUrl;
