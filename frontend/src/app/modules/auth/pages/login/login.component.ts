import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faFeather } from '@fortawesome/free-solid-svg-icons';
import { AlertService } from 'src/app/modules/core/services/alert.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  faFeather = faFeather;
  disableSubmit = false;
  form = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
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
          error: (e) => {
            this.alertService.error(e);
            this.disableSubmit = false;
          },
        });
    }
  }
}
