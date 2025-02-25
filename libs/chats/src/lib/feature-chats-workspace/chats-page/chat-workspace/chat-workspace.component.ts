import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ChatWorkspaceHeaderComponent } from './chat-workspace-header';
import { ChatWorkspaceMessagesWrapperComponent } from './chat-workspace-messages-wrapper';
import { ChatsService } from '@tt/data-access/';


@Component({
  selector: 'app-chat-workspace',
  standalone: true,
  imports: [
    ChatWorkspaceHeaderComponent,
    ChatWorkspaceMessagesWrapperComponent,
    AsyncPipe,
  ],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss',
})
export class ChatWorkspaceComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  chatsService: ChatsService = inject(ChatsService);
  activeChat$ = this.route.params.pipe(
    switchMap(({ id }) => {
      if (id === 'new') {
        return this.route.queryParams.pipe(
          filter(({ userId }) => userId),
          switchMap(({ userId }) => {
            return this.chatsService.createChat(userId).pipe(
              switchMap((chat) => {
                this.router.navigate(['chats', chat.id]);
                return of(null);
              })
            );
          })
        );
      }
      return this.chatsService.getChatById(id);
    })
  );
}
