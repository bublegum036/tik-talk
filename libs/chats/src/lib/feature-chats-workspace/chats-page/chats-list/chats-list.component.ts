import { Component, inject } from '@angular/core';
import { ChatsBtnComponent } from '../chats-btn/chats-btn.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatsService } from '@tt/data-access/';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { map, startWith, switchMap } from 'rxjs';

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
