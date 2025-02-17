import { inject, Injectable } from '@angular/core';
import { ProfileService } from '../services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { profileActions } from './actions';
import { map, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProfileEffects {
  profileService = inject(ProfileService);
  actions$ = inject(Actions);

  filterProfiles = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.filterEvents),
      switchMap(({ filters }) => {
        return this.profileService.filterProfiles(filters);
      }),
      map(response => profileActions.profileLoaded({ profiles: response.items })));
  },
    { dispatch: true }

    );

  saveSearchForm = createEffect(() => {
      return this.actions$.pipe(
        ofType(profileActions.searchForm),
        map(searchForm => profileActions.searchForm( {firstName: searchForm.firstName, lastName: searchForm.lastName, stack: searchForm.stack})),
        tap(searchForm => console.log(searchForm.firstName, searchForm.lastName, searchForm.stack))
      );
    },
    { dispatch: true }
  );

}