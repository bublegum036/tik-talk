import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, tap } from 'rxjs';
import { Profile } from '@tt/interfaces/profile';
import { GlobalStoreService, Pageble } from '@tt/shared';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);
  #globalStoreService = inject(GlobalStoreService);
  baseApiUrl = 'https://icherniakov.ru/yt-course/';

  me = signal<Profile | null>(null);

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`);
  }

  getMe() {
    return this.http
      .get<Profile>(`${this.baseApiUrl}account/me`)
      .pipe(tap((response) => {
        this.me.set(response);
        this.#globalStoreService.me.set(response)
      }));
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseApiUrl}account/${id}`);
  }

  getSubscribersShortList(subsAmount = 3) {
    return this.http
      .get<Pageble<Profile>>(`${this.baseApiUrl}account/subscribers/`)
      .pipe(map((response) => response.items.slice(0, subsAmount)));
  }

  patchProfile(profile: Partial<Profile>) {
    return this.http.patch<Profile>(`${this.baseApiUrl}account/me`, profile);
  }

  uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post<Profile>(
      `${this.baseApiUrl}account/upload_image`,
      formData
    );
  }

  filterProfiles(params: Record<string, any>) {
    return this.http
      .get<Pageble<Profile>>(`${this.baseApiUrl}account/accounts`, {
        params,
      })
  }
}
