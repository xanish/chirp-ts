import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faFeather } from '@fortawesome/free-solid-svg-icons';
import { AlertService } from 'src/app/modules/core/services/alert.service';
import { TUser } from 'src/app/modules/shared/types/user.type';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  faFeather = faFeather;
  disableSubmit: boolean = false;
  form = this.formBuilder.group({
    firstName: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(64)],
    ],
    lastName: ['', [Validators.minLength(2), Validators.maxLength(64)]],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(64),
      ],
    ],
    username: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(64)],
    ],
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
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  onSubmit() {
    if (this.form.valid) {
      this.disableSubmit = true;
      this.authService
        .register({
          username: this.form.value.username!,
          email: this.form.value.email!,
          firstName: this.form.value.firstName!,
          lastName: this.form.value.lastName || undefined,
          password: this.form.value.password!,
        })
        .subscribe({
          next: (response: TUser) => {
            this.form.reset();
            this.alertService.success(
              'Registration successful, please check your inbox to verify your e-mail'
            );
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
