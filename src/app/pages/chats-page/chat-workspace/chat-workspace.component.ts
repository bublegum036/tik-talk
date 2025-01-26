import {Component, inject, signal, WritableSignal} from '@angular/core';
import {ChatWorkspaceHeaderComponent} from "./chat-workspace-header/chat-workspace-header.component";
import {
  ChatWorkspaceMessagesWrapperComponent
} from "./chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component";
import {ActivatedRoute} from "@angular/router";
import {ChatsService} from "../../../data/services/chats.service";
import {switchMap, tap, timer} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {Chat} from "../../../data/interfaces/chats.interface";

@Component({
  selector: 'app-chat-workspace',
  standalone: true,
  imports: [
    ChatWorkspaceHeaderComponent,
    ChatWorkspaceMessagesWrapperComponent,
  ],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss'
})
export class ChatWorkspaceComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  chatsService: ChatsService = inject(ChatsService);

  activeChat: WritableSignal<Chat | null> = signal(null);

  ngOnInit() {
    this.route.params.pipe(
        switchMap(({ id }) => this.chatsService.getChatById(id))
    ).subscribe(chats => {
      this.activeChat.set(chats);
    });
  }
}
