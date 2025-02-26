import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {  selectFilteredProfiles } from '@tt/data-access/';
import { ProfileCardComponent } from '../../ui/';
import { Store } from '@ngrx/store';
import { ProfileFiltersComponent } from '../profile-filters';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileCardComponent, ProfileFiltersComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent {
  store = inject(Store);
  profiles = this.store.selectSignal(selectFilteredProfiles);

  constructor() {}
}
