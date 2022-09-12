export interface IRegistration {
  personalInformation: IPersonalInformation;
  visaInformation: IVisaInformation;
}

export interface IPersonalInformation {
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
  embassy: string;
  visaType: string;
  visaCategory: string;
}
