import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProfileCardContainerComponent, ProfileFiltersComponent } from '../index';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileFiltersComponent, ProfileCardContainerComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SearchPageComponent {}
