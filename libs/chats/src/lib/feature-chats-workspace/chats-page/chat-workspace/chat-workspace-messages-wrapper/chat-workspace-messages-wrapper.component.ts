import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ChatGroupedMessage, ChatsService } from '@tt/data-access/';
import { MessageInputComponent } from '../../../../ui';
import { ChatWorkspaceMessageComponent } from './chat-workspace-message';

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  standalone: true,
  imports: [ChatWorkspaceMessageComponent, MessageInputComponent, DatePipe],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWorkspaceMessagesWrapperComponent {
  chatService = inject(ChatsService);

  chat = input.required<ChatGroupedMessage>();

  dailyMessages = this.chatService.dailyMessages;

  router: ActivatedRoute = inject(ActivatedRoute);

  onSendMessage(messageText: string) {
    this.chatService.wsAdapter.sendMessage(messageText, this.chat().id)
  }
}
