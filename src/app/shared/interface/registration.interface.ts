export interface IRegistration {
  id: number;
  personalInformation: IPersonalInformation;
  visaInformation: IVisaInformation;
  labRequisition: ILabRequisition;
}

export interface IPersonalInformation {
  id: number;
  personalCategory: string;
  referral: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: string;
  age: string;
  gender: string;
  contactDetails: string;
  email: string;
  address: string;
  eMedicalRefNo: string;
  civilStatus: string;
  hasMenstrualPeriod: boolean;
  menstrualPeriodStart: string;
  menstrualPeriodEnd: string;
  intendedOccupation: string;
  hasPassport: boolean;
  passportNumber: string;
  dateIssued: string;
  isExpired: boolean;
  otherId: string;
  landLineNumber: string;
  isAcceptedTerms: boolean;
}

export interface IVisaInformation {
  id: number;
  embassy: string;
  visaType: string;
  visaCategory: string;
}

export interface ILabRequisition {
  id: number;
  labRequisition: string[];
}
