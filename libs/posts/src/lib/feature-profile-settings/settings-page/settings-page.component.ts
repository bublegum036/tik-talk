import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  ViewChild
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {  GlobalStoreService, ProfileService } from '@tt/data-access/';
import { firstValueFrom } from 'rxjs';
import { AddressInputComponent, AvatarUploadComponent, ProfileHeaderComponent, StackInputComponent } from '../../ui';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [ProfileHeaderComponent, ReactiveFormsModule, AvatarUploadComponent, StackInputComponent, AddressInputComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent implements AfterViewInit{
  fb = inject(FormBuilder);
  cdr = inject(ChangeDetectorRef)
  profileService = inject(ProfileService);
  me = inject(GlobalStoreService).me;


  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent;

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: [''],
    city: [''],
  });

  constructor() {
    effect(() => {
      // @ts-ignore
      this.form.patchValue({
        ...this.me(),
      });
    });
  }

  ngAfterViewInit() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.avatarUploader.avatar;
  }

  onSave() {
    this.form.markAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    if (this.avatarUploader.avatar) {
      firstValueFrom(
        this.profileService.uploadAvatar(this.avatarUploader.avatar)
      );
    }

    firstValueFrom(
    // @ts-ignore
      this.profileService.patchProfile({
        ...this.form.value!
      })
    );
  }
}
