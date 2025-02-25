import { Component, input } from '@angular/core';
import { ImgUrlPipe } from '@tt/common-ui';
import { AvatarCircleComponent } from '@tt/common-ui';
import { Profile } from 'libs/data-access/src/lib/profile';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [ImgUrlPipe, AvatarCircleComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
})
export class ProfileHeaderComponent {
  profile = input<Profile>();
}
