import { Component, input } from '@angular/core';
import { AvatarCircleComponent } from '@tt/common-ui';
import { DatePipe } from '@angular/common';
import { PostComment } from '../../../../../shared/src/lib';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  comment = input<PostComment>();
}
