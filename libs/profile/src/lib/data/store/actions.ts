import { createActionGroup, props } from '@ngrx/store';
import { Profile } from '@tt/interfaces/profile';
import { SearchFormType } from '@tt/shared';

export const profileActions = createActionGroup({
    source: 'profile',
    events: {
      'filter events': props<{ filters: Record<string, any> }>(),
      'profile loaded': props<{ profiles: Profile[] }>(),
      'search form': props<SearchFormType>(),
    }
})