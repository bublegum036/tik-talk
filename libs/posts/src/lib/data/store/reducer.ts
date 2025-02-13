import { Post } from '@tt/shared';
import { createFeature, createReducer, on } from '@ngrx/store';
import { postsActions } from './actions';

export interface PostsState {
  posts: Post[],
}

export const initialStates: PostsState = {
  posts: [],
};

export const postsFeature = createFeature({
  name: 'postsFeature',
  reducer: createReducer(
    initialStates,
    on(postsActions.getPosts, (state, payload) => {
      return {
        ...state.posts,
        posts: payload.posts,
      }
    }),
  ),
})