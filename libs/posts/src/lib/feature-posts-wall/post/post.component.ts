import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Post, PostComment } from '../../../../../shared/src/lib/data/interfaces/post.interface';
import { AvatarCircleComponent } from '@tt/common-ui';
import { SvgIconComponent } from '@tt/common-ui';
import { PostInputComponent } from '../../ui';
import { CommentComponent } from '../../ui';
import { PostService } from '../../data';
import { firstValueFrom } from 'rxjs';
import { DateClockPipe } from '@tt/common-ui';
import { ProfileService } from '@tt/profile';

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
  public profile = inject(ProfileService).me;

  postService = inject(PostService);

  async ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  async onCreated(commentText: string) {
    firstValueFrom(
      this.postService.createComment({
        text: commentText,
        authorId: this.profile()!.id,
        postId: this.post()!.id,
      })
    ).then(async () => {
      const comments = await firstValueFrom(
        this.postService.getCommentsByPostId(this.post()!.id)
      );
      this.comments.set(comments);
    });
    return;
  }
}
