import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';
import { ProfileService } from '@tt/profile';
import { Chat, ChatGroupedMessage, DailyMessages, LastMessageResponse, Message } from '../interfaces/chats.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  http = inject(HttpClient);
  me = inject(ProfileService).me;
  activeChatMessages = signal<DailyMessages[]>([]);

  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  chatsUrl = `${this.baseApiUrl}chat/`;
  messageUrl = `${this.baseApiUrl}message/`;

  createChat(userId: number) {
    return this.http.post<Chat>(`${this.chatsUrl}${userId}`, {});
  }

  getMyChats() {
    return this.http.get<LastMessageResponse[]>(
      `${this.chatsUrl}get_my_chats/`
    );
  }

  getChatById(chatId: number) {
    return this.http.get<Chat>(`${this.chatsUrl}${chatId}`).pipe(
      map((chat) => {
        const patchedMessages = chat.messages.map((message: Message) => {
          return {
            ...message,
            user:
              chat.userFirst.id === message.userFromId
                ? chat.userFirst
                : chat.userSecond,
            isMine: message.userFromId === this.me()!.id,
          };
        });

        const sortMessages = this.sortedMessagesByDays(patchedMessages);
        this.activeChatMessages.set(sortMessages);

        const groupedChat: ChatGroupedMessage = {
          ...chat,
          companion:
            chat.userFirst.id === this.me()!.id
              ? chat.userSecond
              : chat.userFirst,
          messages: sortMessages,
        };
        return groupedChat;
      })
    );
  }

  sendMessage(chatId: number, message: string): Observable<Message> {
    return this.http.post<Message>(
      `${this.messageUrl}send/${chatId}`,
      {},
      {
        params: {
          message,
        },
      }
    );
  }

  private sortedMessagesByDays(messages: Message[]): DailyMessages[] {
    return messages.reduce(
      (acc: DailyMessages[], message: Message): DailyMessages[] => {
        const msgDate = message.createdAt.slice(0, 10);

        const existingEntry = acc.find((entry) => entry.date === msgDate);

        if (existingEntry) {
          existingEntry.messages.push(message);
          return acc;
        }
        acc.push({
          date: msgDate,
          messages: [message],
        });

        return acc;
      },
      []
    );
  }
}
