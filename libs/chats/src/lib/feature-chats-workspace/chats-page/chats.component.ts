import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatsListComponent } from './chats-list/chats-list.component';
import { ChatsService } from '../../data';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-chats-page',
  standalone: true,
  imports: [RouterOutlet, ChatsListComponent],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss',
})
export class ChatsPagesComponent {
  #chatService = inject(ChatsService);

  constructor() {
    this.#chatService.connectWebSocket()
      .pipe(takeUntilDestroyed())
      .subscribe();
  }
}
