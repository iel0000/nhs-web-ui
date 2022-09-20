import { IRegistration } from '@app/shared/interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectRegistration =
  createFeatureSelector<IRegistration>('registration');

export const selectRecord = createSelector(
  selectRegistration,
  (state: IRegistration) => state
);
