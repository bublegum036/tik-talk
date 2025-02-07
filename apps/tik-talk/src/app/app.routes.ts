import { Routes } from '@angular/router';
import { LoginPageComponent } from '@tt/auth';
import { ProfileEffects, profileFeature, SearchPageComponent } from '@tt/profile';
import { ProfilePageComponent } from '@tt/profile';
import { LayoutComponent } from '@tt/layout';
import { SettingsPageComponent } from '@tt/profile';
import { chatsRoutes } from '@tt/chats';
import { ExperimentFormComponent } from '@tt/experiments';
import { canActivateAuth } from '@tt/auth';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: 'profile/:id', component: ProfilePageComponent },
      {
        path: 'search',
        component: SearchPageComponent,
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects)
        ]

      },
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
