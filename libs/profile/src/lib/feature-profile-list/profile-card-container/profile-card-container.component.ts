import { Component, inject } from '@angular/core';
import { WaIntersectionObservee, WaIntersectionObserverDirective } from '@ng-web-apis/intersection-observer';
import { Store } from '@ngrx/store';
import { profileActions, selectFilteredProfiles } from '@tt/data-access/';
import { ProfileCardComponent } from '../../ui';

@Component({
  selector: 'tt-profile-card-container',
  standalone: true,
  imports: [
    WaIntersectionObserverDirective,
    WaIntersectionObservee,
    ProfileCardComponent
  ],
  templateUrl: './profile-card-container.component.html',
  styleUrl: './profile-card-container.component.scss'
})
export class ProfileCardContainerComponent {
  store = inject(Store);
  profiles = this.store.selectSignal(selectFilteredProfiles);


  timeToFetch() {
    this.store.dispatch(profileActions.setPage({}))
  }

  onIntersection(entries: IntersectionObserverEntry[]) {
    if(!entries.length) return;

    if(entries[0].intersectionRatio > 0) {
      this.timeToFetch()
    }
  }
}
