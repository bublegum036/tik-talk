import {
  Component,
  EventEmitter,
  inject,
  Output,
  Renderer2,
} from '@angular/core';
import { AvatarCircleComponent } from '../../../../../common-ui/src/lib/components/avatar-circle/avatar-circle.component';
import { FormsModule } from '@angular/forms';
import { SvgIconComponent } from '../../../../../common-ui/src/lib/components/svg-icon/svg-icon.component';
import { GlobalStoreService } from '../../../../../shared/src/lib';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [AvatarCircleComponent, FormsModule, SvgIconComponent],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss',
})
export class MessageInputComponent {
  r2 = inject(Renderer2);
  me = inject(GlobalStoreService).me;

  @Output() created: EventEmitter<string> = new EventEmitter<string>();

  public postText = '';

  onTextAreaInput(event: Event) {
    const textArea = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textArea, 'height', 'auto');
    this.r2.setStyle(textArea, 'height', textArea.scrollHeight + 'px');
  }

  public onCreatePost(postText: string): void {
    if (!postText) return;
    this.created.emit(postText);
    this.postText = '';
  }
}
