import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AvatarCircleComponent, ImgUrlPipe, Profile } from '@tt/data-access/';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [ImgUrlPipe, AvatarCircleComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileHeaderComponent {
  profile = input<Profile>();
}
