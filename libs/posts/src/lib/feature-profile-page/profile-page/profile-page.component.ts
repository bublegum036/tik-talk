import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { ProfileService } from '@tt/data-access/';
import { GlobalStoreService, ImgUrlPipe, SvgIconComponent } from '@tt/data-access/';
import { PostFeedComponent, ProfileHeaderComponent } from '@tt/posts';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    RouterLink,
    SvgIconComponent,
    ImgUrlPipe,
    PostFeedComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent {
  globalStoreService = inject(GlobalStoreService);
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  me$ = toObservable(this.globalStoreService.me);
  subscribers$ = this.profileService.getSubscribersShortList(5);

  isMyPage = signal(false);

  profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      this.isMyPage.set(id === 'me' || id === this.globalStoreService.me()?.id);
      if (id === 'me') return this.me$;

      return this.profileService.getAccount(id);
    })
  );

  async sendMessage(userId: number) {
    this.router.navigate(['/chats', 'new'], { queryParams: { userId } });
  }
}
