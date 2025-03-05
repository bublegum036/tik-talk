import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProfileCardContainerComponent, ProfileFiltersComponent } from '../index';
import { InfiniteScrollTriggerComponent, ProfileCardComponent } from '@tt/profile';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileFiltersComponent, ProfileCardContainerComponent, InfiniteScrollTriggerComponent, ProfileCardComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SearchPageComponent {}
