export default interface ICampaignBasicInfo {
  generalInfo: {
    campaignName: string;
    campaignCode: string;
    campaignCategory: string;
    startDate: string;
    endDate: string;
    journeyTags:[];
  };

  companyId: string;
  campaignStatus: string;
  campaignCode: string;
  selectedOTPChannels: [0, 1];
  middleName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  workAuthorization: string;
  preferredChannel: string;
  homeAddress: {
    address1: string;
    address3: string;
    city: string;
    addressState: string;
    zipCode: string;
  };
  clientAddress: {
    address1: string;
    address3: string;
    city: string;
    addressState: string;
    zipCode: string;
  };
  prefCommnChannel: string;
  clientName: string;
  priIntegrationPartnerName: string;
  secIntegrationPartnerName: string;
  contractDuration: string;
  campaignRate: string;
  overTimeRate: string;
  otherRate: string;
  employmentType: string;
  roleAppliedFor: string;
  plannedStartDt: string;
  workFromHomeOptions: string;
  currentStatus: string;
  campaignId: string;
  needsMedicalInsurance: string;
  creationDate: string;
  scheduleInfo:{
    campaignType:string;
  };
 
}

export type ICandidatePersonalInfo = {
  firstName: string;
  lastName: string;
  companyId: string;
  emailAddress: string;
  phoneNumber: string;
  dateOfBirth: string;
  homeAddress: {
    address1: string;
    address2: string;
    city: string;
    addressState: string;
    zipCode: string;
  };
  mobilePhoneNumber: string;
  homePhoneNumber: string;
  ssn: string;
  gender: string;
  cmmnChannel: string;
  workAuthorization: string;
};

export type ICandidateEmploymentInfo = {
  employmentType: string;
  hireDate: string;
  employmentStatus: string;
  jobTitle: string;
  employeeId: string;
  internalReferenceId: string;
  workAddress: {
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
  };
  payType: string;
  regularRate: string;
  overTimeRate: string;
};
