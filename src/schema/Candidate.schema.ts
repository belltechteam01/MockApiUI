export type CandidateBasicInfoType = {
  candidateId: string;
  firstName: string;
  lastName: string;
  companyId: string;
  emailAddress: string;
  phoneNumber: string;
  homeAddress: {
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
  };
  cmmnChannel: string;
  workAuthorization: string;
  errorFields: {
    firstName: boolean;
    lastName: boolean;
    emailAddress: boolean;
    phoneNumber: boolean;
    homeAddress: {
      address1: boolean;
      address2: boolean;
      city: boolean;
      state: boolean;
      zipCode: boolean;
    };
  };
};

export type CandidateClientInfoType = {
  clientName: string;
  priIntegrationPartnerName: string;
  secIntegrationPartnerName: string;
  workLocationOption: string;
  workAddress: {
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
  };
};

export type CandidateContractInfoType = {
  candidateRate: string;
  otherRate: string;
  contractSignedDt: string;
  plannedStartDt: string;
};

export type CandidateFullInfoType = {
  companyId: string;
  creationDate: string;
  candidateId: string;
  candidateType: string;
  candidateStatus: string;
  candidateContractInfo: CandidateContractInfoType;
  candidateClientInfo: CandidateClientInfoType;
  candidateBasicInfo: CandidateBasicInfoType;
};
