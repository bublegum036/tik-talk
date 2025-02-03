import { Component, input } from '@angular/core';
import { Profile } from '../../../../../../../shared/src/lib/data/interfaces/profile.interfaces';
import { AvatarCircleComponent } from '../../../../../../../common-ui/src/lib/components/avatar-circle/avatar-circle.component';

@Component({
  selector: 'app-chat-workspace-header',
  standalone: true,
  imports: [AvatarCircleComponent],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss',
})
export class ChatWorkspaceHeaderComponent {
  profile = input.required<Profile>();
}
