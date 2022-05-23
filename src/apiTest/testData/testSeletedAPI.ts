export const testSeletedAPI = {
  apiId: "c57a4706-bf0d-4a64-84ca-6374e6439416",
  method: "post",
  apiUrl: "https://api.justotp.com/send-otp",
  folderId: "12356",
  creationDate: "2022-04-01T05:15:56:434",
  apiName: "Test API2",
  needsAuthentication: true,
  httpGetPattern: "PATHPARAMETERS/QUERYPARAMETERS",
  dataElements: [
    {
      otpCampaignId: {
        attributeName: "otpCampaignId",
        displaySequence: "1",
      },
    },
    {
      channel: {
        attributeName: "channel",
        displaySequence: 2,
      },
    },
    {
      channelValue: {
        attributeName: "channelValue",
        displaySequence: 3,
      },
    },
  ],
  request: {
    apiHeaders: {
      AUTHENTICATION: "Bearer __JOTP_TOKEN",
      codeName: "dsfdsfdsfds",
      "Access-Control-Allow-Origin": "*",
    },
    authenticationInfo: {
      callMethod: "POST",
      accessTokenName: "access_token",
      clientId: {
        fieldValue: "6g9hugg4q0al9pq7urfeis06ed",
        fieldName: "client_id",
      },
      clientSecret: {
        fieldValue: "hl8vfau9m5g3qc7gj08bknkjpgqrn2r351farper686fjvc3gch",
        fieldName: "client_secret",
      },
      authApiUrl: "https://auth.justotp.com",
      grantType: "client_credentials",
      referenceKey: "",
    },
  },
};
