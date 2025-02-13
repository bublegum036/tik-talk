import { createSelector } from '@ngrx/store';
import { postsFeature } from './reducer';

export const selectGetPosts = createSelector(
  postsFeature.selectPosts,
  (posts) => posts,
)