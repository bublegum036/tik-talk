import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, switchMap } from 'rxjs';
import { CommentCreateDto, Post, PostComment, PostCreateDto } from '@tt/data-access/';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/';


  createPost(playload: PostCreateDto) {
    return this.http.post<Post>(`${this.baseApiUrl}post/`, playload).pipe(
      switchMap(() => {
        return this.fetchPosts();
      })
    );
  }

  fetchPosts() {
    return this.http
      .get<Post[]>(`${this.baseApiUrl}post/`)
  }

  createComment(playload: CommentCreateDto) {
    return this.http.post<PostComment>(`${this.baseApiUrl}comment/`, playload);
  }

  getCommentsByPostId(postId: number) {
    return this.http
      .get<Post>(`${this.baseApiUrl}post/${postId}`)
      .pipe(map((posts) => posts.comments));
  }
}
