export interface ChatConnectionWsParams {
  url: string;
  token: string;
  handleMessage: (message: unknown) => void;
}

export interface ChatWsService {
  connect: (params: ChatConnectionWsParams) => void;
  sendMessage: (text: string, chatId: number) => void;
  disconnect: () => void;
}