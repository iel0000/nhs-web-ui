import { ILabRequisition, IRegistration } from '@app/shared/interface';
import { createReducer, on } from '@ngrx/store';
import * as RegistrationPageActions from './registration.action';
import { formatDate } from '@angular/common';

export const initialState: IRegistration = {
  id: 0,
  branch: 0,
  personalInformation: {
    id: 0,
    personalCategory: '',
    referral: '',
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: '',
    age: '',
    gender: '',
    mobileNumber: '',
    email: '',
    address: '',
    eMedicalRefNo: '',
    civilStatus: '',
    hasMenstrualPeriod: false,
    menstrualPeriodStart: '',
    menstrualPeriodEnd: '',
    intendedOccupation: '',
    hasPassport: false,
    passportNumber: '',
    dateIssued: '',
    isExpired: false,
    hasOtherId: false,
    otherId: '',
    landLineNumber: '',
    isAcceptedTerms: false,
  },
  visaInformation: {
    id: 0,
    embassy: '',
    visaType: '',
    visaCategory: '',
    isFirstVisa: '',
    hasVisaRejected: '',
    lengthOfStay: '0',
    hasLetterReceived: '',
    isTemporaryVisa: '',
    isHealthAssessed: '',
    intendedWork: '0',
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
      let values = { ...payload };
      values.birthDate = formatDate(
        payload.birthDate,
        'yyyy-MM-ddT00:00:00.000',
        'en-US'
      );
      values.dateIssued = formatDate(
        payload.dateIssued,
        'yyyy-MM-ddT00:00:00.000',
        'en-US'
      );
      return { ...state, personalInformation: values };
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
