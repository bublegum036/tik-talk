import { Component, inject, input } from '@angular/core';
import { ChatWorkspaceMessageComponent } from './chat-workspace-message/chat-workspace-message.component';
import { MessageInputComponent } from '../../../../ui/message-input/message-input.component';
import { ChatsService } from '../../../../data/services/chats.service';
import {
  ChatGroupedMessage,
} from '../../../../data/interfaces/chats.interface';
import { firstValueFrom } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  standalone: true,
  imports: [ChatWorkspaceMessageComponent, MessageInputComponent, DatePipe],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
})
export class ChatWorkspaceMessagesWrapperComponent {
  chatService = inject(ChatsService);

  chat = input.required<ChatGroupedMessage>();

  router: ActivatedRoute = inject(ActivatedRoute);

  async onSendMessage(messageText: string) {
    await firstValueFrom(
      this.chatService.sendMessage(this.chat().id, messageText)
    );
    const chat = await firstValueFrom(
      this.chatService.getChatById(this.chat().id)
    );
    this.chat().messages = chat.messages;
  }
}
