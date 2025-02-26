import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AvatarCircleComponent, LastMessageResponse } from '@tt/data-access/';

@Component({
  selector: 'button[chats]',
  standalone: true,
  imports: [AvatarCircleComponent],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatsBtnComponent {
  chat = input<LastMessageResponse>();
}
