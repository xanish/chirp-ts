import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  disableSubmit = false;
  form = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
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
        .login({
          username: this.form.value.username!,
          password: this.form.value.password!,
        })
        .subscribe({
          next: (response: any) => {
            this.form.reset();
            localStorage.setItem('token', response.token);
            this.router.navigate(['/feed']);
          },
          error: (e) => console.error(e),
          complete: () => {
            this.disableSubmit = false;
          },
        });
    }
  }
}
