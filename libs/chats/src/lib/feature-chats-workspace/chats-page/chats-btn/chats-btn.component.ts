import { Component, input } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { AvatarCircleComponent, LastMessageResponse } from '@tt/data-access/';

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
