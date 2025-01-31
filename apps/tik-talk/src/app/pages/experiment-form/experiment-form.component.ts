import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

enum Culture {
  Empty = 'Empty',
  SunFlower = 'SunFlower',
  SoyDean = 'SoyDean',
  Rape = 'Rape',
}

interface IAutoInfo {
  driverName?: string;
  autoNumber?: string;
  weightGross?: number;
  weightNet?: number;
  weightCulture?: number;
  discount?: number;
  weightAccepted?: number;
}

function getAutoInfo(initialValue: IAutoInfo = {}) {
  return new FormGroup({
    driverName: new FormControl<string>(initialValue.driverName ?? ''),
    autoNumber: new FormControl<string>(initialValue.autoNumber ?? ''),
    trailerNumber: new FormControl<string>(initialValue.autoNumber ?? ''),
    weightGross: new FormControl<number>(initialValue.weightGross ?? 0),
    weightNet: new FormControl<number>(initialValue.weightNet ?? 0),
    weightCulture: new FormControl<number>(initialValue.weightCulture ?? 0),
    discount: new FormControl<number>(initialValue.discount ?? 0),
    weightAccepted: new FormControl<number>(initialValue.weightAccepted ?? 0),
  });
}

@Component({
  selector: 'app-experiment-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './experiment-form.component.html',
  styleUrl: './experiment-form.component.scss',
})
export class ExperimentFormComponent {
  culture = Culture;

  form = new FormGroup({
    cultureType: new FormControl(Culture.Empty, Validators.required),
    counterparty: new FormControl('', Validators.required),
    infoAuto: new FormArray([getAutoInfo()]),
  });

  protected addAuto() {
    this.form.controls.infoAuto.insert(0, getAutoInfo());
  }

  protected onSubmit(event: unknown) {
    console.log(this.form.value);
  }
}
