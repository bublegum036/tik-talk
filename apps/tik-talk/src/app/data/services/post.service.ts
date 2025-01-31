import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  PostComment,
  CommentCreateDto,
  Post,
  PostCreateDto,
} from '../interfaces/post.interface';
import { map, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/';

  posts = signal<Post[]>([]);

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
      .pipe(tap((posts: Post[]) => this.posts.set(posts)));
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
