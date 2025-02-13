import { inject, Injectable } from '@angular/core';
import { PostService } from '../index';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { postsActions } from './actions';
import { exhaustMap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostEffect {
  postService = inject(PostService);
  postsActions$ = inject(Actions);

  getPosts = createEffect(() => {
      return this.postsActions$.pipe(
        ofType(postsActions.getPosts),
        exhaustMap(() => this.postService.fetchPosts()),
        map(response => {
          return postsActions.getPosts({ posts: response });
        })
      );
    }
  );


}