import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ImgUrlPipe, Profile } from '@tt/data-access/';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
  @Input() profile!: Profile;
}
