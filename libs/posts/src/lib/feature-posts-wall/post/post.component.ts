import { Component, inject, input, OnInit, signal } from '@angular/core';
import { AvatarCircleComponent } from '@tt/common-ui';
import { SvgIconComponent } from '@tt/common-ui';
import { PostInputComponent } from '../../ui';
import { CommentComponent } from '../../ui';
import { PostService } from '../../data';
import { map, switchMap } from 'rxjs';
import { DateClockPipe } from '@tt/common-ui';
import { GlobalStoreService, Post, PostComment } from '@tt/shared';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
