import { createActionGroup, props } from '@ngrx/store';
import { Profile } from '../../interfaces';
import { SearchFormType } from '../../../shared';

export const profileActions = createActionGroup({
    source: 'profile',
    events: {
      'filter events': props<{ filters: Record<string, any> }>(),
      'profile loaded': props<{ profiles: Profile[] }>(),
      'search form': props<SearchFormType>(),
    }
})