import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatsService } from '@tt/data-access/';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { map, startWith, switchMap } from 'rxjs';
import { ChatsBtnComponent } from '../chats-btn';

@Component({
  selector: 'app-chats-list',
  standalone: true,
  imports: [
    ChatsBtnComponent,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatsListComponent {
  chatService = inject(ChatsService);

  filterChatsControl = new FormControl();

  chats$ = this.chatService.getMyChats().pipe(
    switchMap((chats) => {
      return this.filterChatsControl.valueChanges.pipe(
        startWith(''),
        map((inputValue) => {
          return chats.filter((chat) => {
            return `${chat.userFrom.firstName} ${chat.userFrom.lastName}`
              .toLowerCase()
              .includes(inputValue.toLowerCase());
          });
        })
      );
    })
  );
}
