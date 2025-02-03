import { Routes } from '@angular/router';
import { LoginPageComponent } from '../../../../libs/auth/src/lib/feature-login/login-page/login-page.component';
import { SearchPageComponent } from '../../../../libs/profile/src/lib/feature-profile-list/search-page/search-page.component';
import { ProfilePageComponent } from '../../../../libs/profile/src/lib/feature-profile-page/profile-page/profile-page.component';
import { LayoutComponent } from '../../../../libs/common-ui/src/lib/components/layout/layout.component';
import { SettingsPageComponent } from '../../../../libs/profile/src/lib/feature-profile-settings/settings-page/settings-page.component';
import { chatsRoutes } from '../../../../libs/chats/src/lib/feature-chats-workspace/chats-page/chatsRoutes';
import { ExperimentFormComponent } from '../../../../libs/experiments/src/lib/form-feature/experiment-form/experiment-form.component';
import { canActivateAuth } from '@tt/auth';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: 'profile/:id', component: ProfilePageComponent },
      { path: 'search', component: SearchPageComponent },
      { path: 'settings', component: SettingsPageComponent },
      { path: 'experiment', component: ExperimentFormComponent },
      {
        path: 'chats',
        loadChildren: () => chatsRoutes,
      },
    ],
    canActivate: [canActivateAuth],
  },
  { path: 'login', component: LoginPageComponent },
];
