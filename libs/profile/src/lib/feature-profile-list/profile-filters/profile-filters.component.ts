import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, startWith } from 'rxjs';
import { Store } from '@ngrx/store';
import { profileActions } from '../../../../../data-access/src/lib/profile/data';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { selectSearchForm } from '../../../../../data-access/src/lib/profile/data/store/selectors';
import { SearchFormType } from '@tt/data-access/';

@Component({
  selector: 'app-profile-filters',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss'
})
export class ProfileFiltersComponent {
  fb = inject(FormBuilder);
  store = inject(Store);
  saveSearchForm = this.store.select(selectSearchForm);

  searchForm: FormGroup<SearchFormType> = this.fb.group<SearchFormType>({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    stack: new FormControl('')
  });

  constructor() {
    this.saveSearchForm.subscribe(storeForm => {
      console.log(storeForm);
    })

    this.searchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(300),
        takeUntilDestroyed()
      )
      .subscribe(formValue => {
        this.store.dispatch(profileActions.filterEvents({ filters: formValue }));
      });
  }
}
