import { Component, input } from '@angular/core';
import { DailyMessages } from '../../../../../data/interfaces/chats.interface';
import { AvatarCircleComponent } from '../../../../../../../../common-ui/src/lib/components/avatar-circle/avatar-circle.component';
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
