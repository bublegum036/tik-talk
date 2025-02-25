import { Component, Input } from '@angular/core';
import { ImgUrlPipe, Profile } from '@tt/data-access/';

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
