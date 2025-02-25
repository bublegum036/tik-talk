import { Component, inject, input, OnInit, signal } from '@angular/core';
import { switchMap } from 'rxjs';
import {
  AvatarCircleComponent,
  DateClockPipe,
  GlobalStoreService,
  Post,
  PostComment, PostService,
  SvgIconComponent
} from '@tt/data-access/';
import { CommentComponent, PostInputComponent } from '../../ui';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent,
    DateClockPipe,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  public post = input<Post>();
  public comments = signal<PostComment[]>([]);
  public profile = inject(GlobalStoreService).me;

  postService = inject(PostService);

  ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  onCreated(commentText: string) {
      this.postService.createComment({
        text: commentText,
        authorId: this.profile()!.id,
        postId: this.post()!.id,
      }).pipe(
        switchMap(post => this.postService.getCommentsByPostId(post.postId)),
      ).subscribe(comments => this.comments.set(comments))
    return;
  }
}
