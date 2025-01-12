import {inject, Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Chat, LastMessageResponse, Message} from "../interfaces/chats.interface";
import {ProfileService} from "./profile.service";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ChatsService {
  http = inject(HttpClient);
  me = inject(ProfileService).me;

  activeChatMessages = signal<Message[]>([]);

  baseApiUrl = 'https://icherniakov.ru/yt-course/'
  chatsUrl = `${this.baseApiUrl}chat/`
  messageUrl = `${this.baseApiUrl}message/`

  createChat(userId: number) {
    return this.http.post<Chat>(`${this.chatsUrl}${userId}`, {})
  }

  getMyChats() {
    return this.http.get<LastMessageResponse[]>(`${this.chatsUrl}get_my_chats/`)
  }

  getChatById(chatId: number) {
    return this.http.get<Chat>(`${this.chatsUrl}${chatId}`)
      .pipe(
        map(chat => {
            const patchedMessages = chat.messages.map(message => {
              return {
                ...message,
                user: chat.userFirst.id === message.userFromId ? chat.userFirst : chat.userSecond,
                isMine: message.userFromId === this.me()!.id,
              }
            })

            this.activeChatMessages.set(patchedMessages);


            // const gropedMessagesByDate = patchedMessages.reduce((acc: Record<string, { messages: Message[]; }>, message) => {
            //   const date: string = message.createdAt.slice(0, 10);
            //   return {
            //     ...acc,
            //     [date]: {
            //       messages: [...(acc[date]?.messages || []), message]
            //     }
            //   }
            // }, {});
            //
            // this.activeChatMessages.next(gropedMessagesByDate);

            return {
              ...chat,
              companion: chat.userFirst.id === this.me()!.id ? chat.userSecond : chat.userFirst,
              messages: patchedMessages,
            };
          },
        ),
      )
  }

  sendMessage(chatId: number, message: string): Observable<Message> {
    return this.http.post<Message>(`${this.messageUrl}send/${chatId}`, {}, {
      params: {
        message
      }
    })
  }
}
