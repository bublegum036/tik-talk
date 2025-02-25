import { createSelector } from '@ngrx/store';
import { profileFeature } from './reducer';

export const selectFilteredProfiles = createSelector(
  profileFeature.selectProfiles,
  (profiles) => profiles
);

export const selectSearchForm = createSelector(
  profileFeature.selectSearchForm,
  (searchForm) => {
      searchForm.firstName,
      searchForm.lastName,
      searchForm.stack;
  }
);