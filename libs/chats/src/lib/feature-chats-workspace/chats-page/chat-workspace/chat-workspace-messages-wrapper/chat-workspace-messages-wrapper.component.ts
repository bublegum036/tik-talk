import { Component, inject, input } from '@angular/core';
import { ChatWorkspaceMessageComponent } from './chat-workspace-message/chat-workspace-message.component';
import { MessageInputComponent } from '../../../../ui/message-input/message-input.component';
import { ChatsService } from '../../../../data/services/chats.service';
import {
  ChatGroupedMessage,
} from '../../../../data/interfaces/chats.interface';
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

  dailyMessages = this.chatService.dailyMessages;

  router: ActivatedRoute = inject(ActivatedRoute);

  onSendMessage(messageText: string) {
    this.chatService.wsAdapter.sendMessage(messageText, this.chat().id)

    // await firstValueFrom(
    //   this.chatService.sendMessage(this.chat().id, messageText)
    // );

    this.chatService.getChatById(this.chat().id).subscribe(chat => {
      this.chat().messages = chat.messages;
    })
  }
}
