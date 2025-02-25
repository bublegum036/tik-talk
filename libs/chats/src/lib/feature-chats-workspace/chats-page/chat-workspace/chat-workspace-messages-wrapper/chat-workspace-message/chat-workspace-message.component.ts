import { Component, input } from '@angular/core';
import { DailyMessages } from '../../../../../../../../data-access/src/lib/chats/interfaces/chats.interface';
import { AvatarCircleComponent } from '@tt/common-ui';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-chat-workspace-message',
  standalone: true,
  imports: [AvatarCircleComponent, DatePipe, NgClass],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss',
})
export class ChatWorkspaceMessageComponent {
  dailyMessage = input.required<DailyMessages>();
}
