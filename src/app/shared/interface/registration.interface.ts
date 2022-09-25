export interface IRegistration {
  id: number;
  personalInformation: IPersonalInformation;
  visaInformation: IVisaInformation;
  labRequisition: ILabRequisition;
}

export interface IPersonalInformation {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: string;
  age: string;
  gender: string;
  address: string;
  contactDetails: string;
  email: string;
  eMedicalRefNo: string;
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
