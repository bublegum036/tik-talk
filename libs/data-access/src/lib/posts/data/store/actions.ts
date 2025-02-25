import { createActionGroup, props } from '@ngrx/store';
import { Post } from '../../../shared';

export const postsActions = createActionGroup({
  source: 'posts',
  events: {
    'get posts': props<{ posts: Post[] }>(),
  }
})