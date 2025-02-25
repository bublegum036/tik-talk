import { FormControl } from '@angular/forms';

export interface SearchFormType {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  stack: FormControl<string | null>;
}