import { createActionGroup, props } from '@ngrx/store';
import { Profile } from 'libs/data-access/src/lib/profile';
import { SearchFormType } from '@tt/data-access/';

export const profileActions = createActionGroup({
    source: 'profile',
    events: {
      'filter events': props<{ filters: Record<string, any> }>(),
      'profile loaded': props<{ profiles: Profile[] }>(),
      'search form': props<SearchFormType>(),
    }
})