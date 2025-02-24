import { type ChatWsMessage } from './chat-ws-message.interface';
import { type ChatConnectionWsParams, type ChatWsService } from './chat-ws-service.interface';
import { type Chat, type ChatGroupedMessage, type Message, type DailyMessages, type LastMessageResponse } from './chats.interface';
import { isErrorMessage, isUnreadMessage, isNewMessage } from './type-guards';

export {
  Chat,
  ChatGroupedMessage,
  Message,
  DailyMessages,
  LastMessageResponse,
  ChatWsService,
  ChatConnectionWsParams,
  ChatWsMessage,
  isUnreadMessage,
  isErrorMessage,
  isNewMessage
}