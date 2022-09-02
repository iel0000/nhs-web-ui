import { IPersonalInformation } from '@app/shared/interface/registration.interface';
import { createAction, props } from '@ngrx/store';

export const UpdatePersonalInformation = createAction(
  '[Personal Component] Update Personal Information',
  props<{ payload: IPersonalInformation }>()
);
