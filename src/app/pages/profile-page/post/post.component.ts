import {Component, inject, input, OnInit, signal} from '@angular/core';
import {Post, PostComment} from "../../../data/interfaces/post.interface";
import {AvatarCircleComponent} from "../../../common-ui/avatar-circle/avatar-circle.component";
import {SvgIconComponent} from "../../../common-ui/svg-icon/svg-icon.component";
import {PostInputComponent} from "../post-input/post-input.component";
import {CommentComponent} from "../../profile/post/comment/comment.component";
import {PostService} from "../../../data/services/post.service";
import {firstValueFrom} from "rxjs";
import {DateClockPipe} from "../../../helpers/pipes/date-clock.pipe";
import {ProfileService} from "../../../data/services/profile.service";


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
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  public post = input<Post>();
  public comments = signal<PostComment[]>([]);
  public profile = inject(ProfileService).me;


  postService = inject(PostService);


  async ngOnInit() {
    this.comments.set(this.post()!.comments)
  }

  async onCreated(commentText: string) {
    firstValueFrom(this.postService.createComment({
      text: commentText,
      authorId: this.profile()!.id,
      postId: this.post()!.id
    })).then(async () => {
      const comments = await firstValueFrom(this.postService.getCommentsByPostId(this.post()!.id))
      this.comments.set(comments)
    })
    return;
  }
}
