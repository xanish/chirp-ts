import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFeather } from '@fortawesome/free-solid-svg-icons';
import { AlertService } from 'src/app/modules/core/services/alert.service';
import { ValidationMessageComponent } from '../../../shared/components/validation-message/validation-message.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  standalone: true,
  imports: [
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    ValidationMessageComponent,
    NgIf,
  ],
})
export class ResetPasswordComponent {
  faFeather = faFeather;
  disableSubmit: boolean = false;
  form = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(20)],
    ],
    confirmPassword: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(20)],
    ],
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  onSubmit() {
    if (this.form.valid) {
      this.disableSubmit = true;
      this.authService
        .resetPassword({
          username: this.form.value.username!,
          password: this.form.value.password!,
          confirmPassword: this.form.value.confirmPassword!,
        })
        .subscribe({
          next: (response: any) => {
            this.form.reset();
            this.router.navigate(['/auth/login']);
            this.alertService.success('Your password has been reset');
            this.disableSubmit = false;
          },
          error: (e) => {
            this.alertService.error(e);
            this.disableSubmit = false;
          },
        });
    }
  }
}
