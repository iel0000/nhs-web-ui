import { IPersonalInformation, IVisaInformation } from '@app/shared/interface';
import { createAction, props } from '@ngrx/store';

export const UpdatePersonalInformation = createAction(
  '[Personal Component] Update Personal Information',
  props<{ payload: IPersonalInformation }>()
);

export const ResetRegistrationForm = createAction(
  '[Personal Component] Reset RegistrationForm'
);

export const UpdateVisaInformation = createAction(
  '[Visa Info Component] Update Visa Information',
  props<{ payload: IVisaInformation }>()
);

export const UpdateLabRequisition = createAction(
  '[Lab Requisition Component] Update Lab Requisition',
  props<{ payload: string[] }>()
);
