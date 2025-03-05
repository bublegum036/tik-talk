import { Component, forwardRef, HostBinding, HostListener, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'tt-stack-input',
  standalone: true,
  imports: [
    SvgIconComponent,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './stack-input.component.html',
  styleUrl: './stack-input.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => StackInputComponent),
  }]
})
export class StackInputComponent implements ControlValueAccessor {

  value$ = new BehaviorSubject<string[]>([]);

  #disabled =false;

  @HostBinding('class.disabled')
  get disabled(): boolean {
    return this.#disabled;
  }

  innerInput = '';

  @HostListener('keydown.enter', ['$event'])
  onEnter(event: KeyboardEvent) {
    event.stopPropagation();
    event.preventDefault();

    if (!this.innerInput) return;
    this.value$.next([...this.value$.value, this.innerInput]);
    this.innerInput = '';
    this.onChange(this.value$.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.#disabled = isDisabled;
  }

  writeValue(stack: string[] | null): void {
    if (!stack) {
      this.value$.next([]);
      return;
    }

    this.value$.next(stack);
  }

  onChange(value: string[] | null): void {

  }

  onTouched() {

  }

  onTagRemove(tagIndex: number) {
    const tags = this.value$.value;
    tags.splice(tagIndex, 1)
    this.value$.next(tags);
    this.onChange(this.value$.value);
  }

}
