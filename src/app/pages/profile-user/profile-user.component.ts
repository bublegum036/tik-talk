import {Component, Input} from '@angular/core';
import {ImgUrlPipe} from "../../helpers/pipes/img-url.pipe";
import {Profile} from "../../data/interfaces/profile.interfaces";

@Component({
  selector: 'app-profile-user',
  standalone: true,
    imports: [
        ImgUrlPipe
    ],
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.scss'
})
export class ProfileUserComponent {
  @Input() profile!: Profile;
}
