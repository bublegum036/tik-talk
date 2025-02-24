import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';
import { GlobalStoreService } from '@tt/shared';
import {
  Chat,
  ChatGroupedMessage,
  ChatWsMessage,
  ChatWsService,
  DailyMessages, isErrorMessage,
  LastMessageResponse,
  Message
} from '../interfaces';
import { AuthService } from '@tt/auth';
import { ChatWsRxJsService } from './';
import { isNewMessage } from '../interfaces/type-guards';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  http = inject(HttpClient);
  #auth = inject(AuthService);
  me = inject(GlobalStoreService).me;
  activeChatMessages = signal<Message[]>([]);
  dailyMessages = signal<DailyMessages[]>([]);
  unreadMessages = signal<number>(0);

  wsAdapter: ChatWsService = new ChatWsRxJsService();

  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  chatsUrl = `${this.baseApiUrl}chat/`;
  messageUrl = `${this.baseApiUrl}message/`;

  connectWebSocket() {
    return this.wsAdapter.connect({
      url: `${this.baseApiUrl}chat/ws`,
      token: this.#auth.token ?? '',
      handleMessage: this.handleWsMessage
    }) as Observable<ChatWsMessage>;
  }

  handleWsMessage = (message: ChatWsMessage) => {
    console.log(message);
    if (!('action' in message)) return;

    if(isNewMessage(message)) {
      this.activeChatMessages.set([
        ...this.activeChatMessages(),
        {
          id: message.data.id,
          userFromId: message.data.author,
          personalChatId: message.data.chat_id,
          text: message.data.message,
          createdAt: message.data.created_at,
          isRead: false,
          isMine: false
        }
      ]);
      this.dailyMessages.set(this.sortedMessagesByDays(this.activeChatMessages()));
    }
  };

  createChat(userId: number) {
    return this.http.post<Chat>(`${this.chatsUrl}${userId}`, {});
  }

  getMyChats() {
    return this.http.get<LastMessageResponse[]>(
      `${this.chatsUrl}get_my_chats/`
    );
  }

  getChatById(chatId: number): Observable<ChatGroupedMessage> {
    return this.http.get<Chat>(`${this.chatsUrl}${chatId}`).pipe(
      map((chat: Chat): ChatGroupedMessage => {
        const patchedMessages = chat.messages.map((message: Message) => {
          return {
            ...message,
            user:
              chat.userFirst.id === message.userFromId
                ? chat.userFirst
                : chat.userSecond,
            isMine: message.userFromId === this.me()!.id
          };
        });

        this.activeChatMessages.set(patchedMessages);

        const sortMessages = this.sortedMessagesByDays(this.activeChatMessages());
        this.dailyMessages.set(sortMessages);

        return {
          ...chat,
          companion:
            chat.userFirst.id === this.me()!.id
              ? chat.userSecond
              : chat.userFirst,
          messages: sortMessages
        };
      })
    );
  }

  // sendMessage(chatId: number, message: string): Observable<Message> {
  //   return this.http.post<Message>(
  //     `${this.messageUrl}send/${chatId}`,
  //     {},
  //     {
  //       params: {
  //         message
  //       }
  //     }
  //   );
  // }

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
          messages: [message]
        });

        return acc;
      },
      []
    );
  }
}
