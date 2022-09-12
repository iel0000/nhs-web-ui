import { IRegistration } from '@app/shared/interface/registration.interface';
import { createReducer, on } from '@ngrx/store';
import * as RegistrationPageActions from './registration.action';

export const initialState: IRegistration = {
  personalInformation: {
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: '',
    age: '',
    gender: '',
    address: '',
    contactDetails: '',
    email: '',
    eMedicalRefNo: '',

  },
  visaInformation:{
    embassy: '',
    visaType: '',
    visaCategory: '',
  },
};

export const registrationPageReducer = createReducer(
  initialState,
  on(
    RegistrationPageActions.UpdatePersonalInformation,
    (state, { payload }): IRegistration => {
      return { ...state, personalInformation: payload };
    }
  )
);
