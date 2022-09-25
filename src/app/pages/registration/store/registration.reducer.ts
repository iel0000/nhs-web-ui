import { ILabRequisition, IRegistration } from '@app/shared/interface';
import { createReducer, on } from '@ngrx/store';
import * as RegistrationPageActions from './registration.action';

export const initialState: IRegistration = {
  id: 0,
  personalInformation: {
    id: 0,
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
  visaInformation: {
    id: 0,
    embassy: '',
    visaType: '',
    visaCategory: '',
  },
  labRequisition: {
    id: 0,
    labRequisition: [],
  },
};

export const registrationPageReducer = createReducer(
  initialState,
  on(
    RegistrationPageActions.UpdatePersonalInformation,
    (state, { payload }): IRegistration => {
      return { ...state, personalInformation: payload };
    }
  ),
  on(
    RegistrationPageActions.UpdateVisaInformation,
    (state, { payload }): IRegistration => {
      return { ...state, visaInformation: payload };
    }
  ),
  on(
    RegistrationPageActions.UpdateLabRequisition,
    (state, { payload }): IRegistration => {
      let labRequisitionId = state.labRequisition.id;
      let newData: ILabRequisition = {
        id: labRequisitionId,
        labRequisition: payload,
      };
      return { ...state, labRequisition: newData };
    }
  ),
  on(RegistrationPageActions.ResetRegistrationForm, (state): IRegistration => {
    let personalInformation = initialState.personalInformation;
    let visaInformation = initialState.visaInformation;
    let labRequisition = initialState.labRequisition;
    return {
      ...state,
      personalInformation: personalInformation,
      visaInformation: visaInformation,
      labRequisition: labRequisition,
    };
  }),
  on(
    RegistrationPageActions.LoadRegistrationRecord,
    (state, { payload }): IRegistration => {
      let personalInformation = payload.personalInformation;
      let visaInformation = payload.visaInformation;
      let labRequisition = payload.labRequisition;
      let id = payload.id;

      return {
        ...state,
        id: id,
        personalInformation: personalInformation,
        visaInformation: visaInformation,
        labRequisition: labRequisition,
      };
    }
  )
);
