import { Routes } from '@angular/router';
import { LoginPageComponent } from '@tt/auth';
import { LayoutComponent } from '@tt/layout';
import { ExperimentFormComponent } from '@tt/experiments';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { canActivateAuth, PostEffect, postsFeature, ProfileEffects, profileFeature } from '@tt/data-access/';
import { SearchPageComponent } from '@tt/profile';
import { ProfilePageComponent, SettingsPageComponent } from '@tt/posts';
import { chatsRoutes } from '@tt/chats';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile/me',
        pathMatch: 'full',
      },
      {
        path: 'profile/:id',
        component: ProfilePageComponent,
        providers: [
          provideState(postsFeature),
          provideEffects(PostEffect),
        ]
      },
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
