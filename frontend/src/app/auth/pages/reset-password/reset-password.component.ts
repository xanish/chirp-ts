import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
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
    private authService: AuthService
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
          },
          error: (e) => console.error(e),
          complete: () => {
            this.disableSubmit = false;
          },
        });
    }
  }
}
