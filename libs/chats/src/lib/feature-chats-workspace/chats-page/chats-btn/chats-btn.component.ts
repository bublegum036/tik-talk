import { Component, input } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { AvatarCircleComponent } from '@tt/common-ui';
import { LastMessageResponse } from '../../../../../../data-access/src/lib/chats';

@Component({
  selector: 'button[chats]',
  standalone: true,
  imports: [AvatarCircleComponent, RouterLinkActive],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.scss',
})
export class ChatsBtnComponent {
  chat = input<LastMessageResponse>();
}
