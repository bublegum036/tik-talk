import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { SvgIconComponent } from '@tt/common-ui';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { firstValueFrom, Subscription, timer } from 'rxjs';
import { ImgUrlPipe } from '@tt/common-ui';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { ProfileService } from '@tt/profile';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChatsService, isErrorMessage } from '../../../../data-access/src/lib/chats';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    SubscriberCardComponent,
    SubscriberCardComponent,
    RouterLink,
    AsyncPipe,
    ImgUrlPipe,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  profileService = inject(ProfileService);
  chatService = inject(ChatsService);
  destroyRef = inject(DestroyRef);

  wsSubscribe!: Subscription;
  subscribers$ = this.profileService.getSubscribersShortList();

  me = this.profileService.me;
  unreadMessages = this.chatService.unreadMessages;


  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: '/profile/me'
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats',
      unread: 0
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search'
    }
  ];

  async reconnect() {
    console.log('reconnecting');
    await firstValueFrom(this.profileService.getMe());
    await firstValueFrom(timer(11000));
    this.connectWS();
  }

  connectWS() {
    this.wsSubscribe?.unsubscribe();
    this.wsSubscribe = this.chatService.connectWebSocket()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(message => {
        if (isErrorMessage(message)) {
          console.log('Invalid token');
          this.reconnect();
        }

        this.menuItems.forEach(menu => {
          if (menu.link === 'chats') {
            menu.unread = this.unreadMessages();
          }
        });
      });
  }

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
    this.connectWS();
  }
}
