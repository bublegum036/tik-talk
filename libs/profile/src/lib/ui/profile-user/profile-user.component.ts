import { Component, Input } from '@angular/core';
import { ImgUrlPipe } from '@tt/common-ui';
import { Profile } from '../../../../../shared/src';

@Component({
  selector: 'app-profile-user',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.scss',
})
export class ProfileUserComponent {
  @Input() profile!: Profile;
}
