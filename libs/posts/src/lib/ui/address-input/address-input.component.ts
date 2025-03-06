import {
  ChangeDetectionStrategy,
  Component, forwardRef,
  inject,
  input, signal
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DadataService, Profile, TtInputComponent } from '@tt/data-access/';

@Component({
  selector: 'tt-address-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TtInputComponent
  ],
  templateUrl: './address-input.component.html',
  styleUrl: './address-input.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => AddressInputComponent),
  }]

})
export class AddressInputComponent implements ControlValueAccessor {
  profile = input.required<Profile>()
  innerSearchControl = new FormControl();
  #dadataService = inject(DadataService);

  isDropDownOpened = signal<boolean>(true)

  suggestions$ = this.innerSearchControl.valueChanges.pipe(
    debounceTime(500),
    switchMap(value => {
      return this.#dadataService.getSuggestion(value)
        .pipe(
          tap(response => {
            this.isDropDownOpened.set(!!response.length)
          })
        )
    })
  )

  writeValue(city: string): void {
    this.innerSearchControl.patchValue(city, {
      emitEvent: false,
    });
  }

  setDisabledState(isDisabled: boolean): void {
  }


  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  onChange(value: any): void {
  }

  onTouched() {
  }

  onSuggestionPick(city: string) {
    this.isDropDownOpened.set(false);
    this.innerSearchControl.patchValue(city, {
      emitEvent: false,
    });
    this.onChange(city)
  }

  onModelChange(city: string): void {
    this.onChange(city);
  }
}
