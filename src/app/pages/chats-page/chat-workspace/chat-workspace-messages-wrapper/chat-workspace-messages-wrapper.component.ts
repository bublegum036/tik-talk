import {Component, inject, input, OnInit, signal} from '@angular/core';
import {ChatWorkspaceMessageComponent} from "./chat-workspace-message/chat-workspace-message.component";
import {MessageInputComponent} from "../../../../common-ui/message-input/message-input.component";
import {ChatsService} from "../../../../data/services/chats.service";
import {Chat, DailyMessages, Message} from "../../../../data/interfaces/chats.interface";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  standalone: true,
  imports: [
    ChatWorkspaceMessageComponent,
    MessageInputComponent,
  ],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss'
})
export class ChatWorkspaceMessagesWrapperComponent implements OnInit {
  chatService = inject(ChatsService)

  chat = input.required<Chat>()

  dailyMessages = signal<DailyMessages[]>([]);


  ngOnInit() {
    const messages = this.chat().messages
    const sortedMessages: DailyMessages[] = this.sortedMessagesByDays(messages);
    this.dailyMessages.set(sortedMessages);
  }

  async onSendMessage(messageText: string) {
    await firstValueFrom(this.chatService.sendMessage(this.chat().id, messageText))

    const chat = await firstValueFrom(this.chatService.getChatById(this.chat().id))

    const dailyMessages = this.sortedMessagesByDays(chat.messages)

    this.dailyMessages.set(dailyMessages as DailyMessages[]);
  }

  sortedMessagesByDays(messages: Message[]): DailyMessages[] {
    return messages.reduce((acc: DailyMessages[], message: Message):DailyMessages[] => {
      const msgDate = message.createdAt.slice(0, 10);

      const existingEntry = acc.find(entry => entry.date === msgDate);

      if (existingEntry) {
        existingEntry.messages.push(message);
        return acc;
      }
      acc.push({
        date: msgDate,
        messages: [message]
      });

      return acc;
    }, []);
  }
}
