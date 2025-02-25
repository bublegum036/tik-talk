import { createFeature, createReducer, on } from '@ngrx/store';
import { profileActions } from './actions';
import { FormControl } from '@angular/forms';
import { Profile } from '../../interfaces';
import { SearchFormType } from '../../../shared';

export interface ProfileState {
  profiles: Profile[],
  profileFilters: Record<string, any>,
  searchForm: SearchFormType,
}

export const initialState: ProfileState = {
  profiles: [],
  profileFilters: {},
  searchForm: {
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    stack: new FormControl(''),
  }
};

export const profileFeature = createFeature({
  name: 'profileFeature',
  reducer: createReducer(
    initialState,
    on(profileActions.profileLoaded, (state, payload) => {
      return {
        ...state,
        profiles: payload.profiles,
      }
    }),
    on(profileActions.searchForm, (state, payload) => {
      console.log('state', state);
      console.log('payload', payload);
      return {
        ...state,
        searchForm: { firstName: payload.firstName, lastName: payload.lastName, stack: payload.stack },
      }
    })
  ),
})