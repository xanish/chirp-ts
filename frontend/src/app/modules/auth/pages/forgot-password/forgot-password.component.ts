import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faFeather } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  faFeather = faFeather;
  disableSubmit = false;
  form = this.formBuilder.group({
    username: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  onSubmit() {
    if (this.form.valid) {
      this.disableSubmit = true;
      this.authService
        .forgotPassword({
          username: this.form.value.username!,
        })
        .subscribe({
          next: (response: any) => {
            this.form.reset();
            console.log('please check your inbox for reset link');
          },
          error: (e) => console.error(e),
          complete: () => {
            this.disableSubmit = false;
          },
        });
    }
  }
}
