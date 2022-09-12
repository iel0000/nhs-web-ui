import { IPersonalInformation, IVisaInformation } from '@app/shared/interface/registration.interface';
import { createAction, props } from '@ngrx/store';

export const UpdatePersonalInformation = createAction(
  '[Personal Component] Update Personal Information',
  props<{ payload: IPersonalInformation }>()
);
export const UpdateVisaInformation = createAction(
  '[Visa Info Component] Update Visa Information',
  props<{ payload: IVisaInformation }>()
);
