import { Component, inject } from '@angular/core';
import {  selectFilteredProfiles } from '../../../../../data-access/src/lib/profile/data';
import { ProfileCardComponent } from '../../ui/';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProfileFiltersComponent } from '../profile-filters';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileCardComponent, ProfileFiltersComponent, AsyncPipe],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  store = inject(Store);
  profiles = this.store.selectSignal(selectFilteredProfiles);

  constructor() {}
}
