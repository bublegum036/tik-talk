import {
  Component,
  EventEmitter,
  HostBinding,
  inject,
  input,
  Output,
  Renderer2,
} from '@angular/core';
import { AvatarCircleComponent } from '@tt/common-ui';
import { ProfileService } from '@tt/profile';
import { SvgIconComponent } from '@tt/common-ui';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [AvatarCircleComponent, SvgIconComponent, FormsModule],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss',
})
export class PostInputComponent {
  r2 = inject(Renderer2);

  public postId = input<number>(0);
  public isCommentInput = input(false);
  public profile = inject(ProfileService).me;

  @Output() created: EventEmitter<string> = new EventEmitter();

  @HostBinding('class.comment')
  get isComment() {
    return this.isCommentInput();
  }

  public postText = '';

  onTextAreaInput(event: Event) {
    const textArea = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textArea, 'height', 'auto');
    this.r2.setStyle(textArea, 'height', textArea.scrollHeight + 'px');
  }

  public onCreatePost(postText: string): void {
    if (!postText) return;
    this.postText = '';
    this.created.emit(postText);
  }
}
