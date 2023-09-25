import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faFeather } from '@fortawesome/free-solid-svg-icons';
import { AlertService } from 'src/app/modules/core/services/alert.service';
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
    private authService: AuthService,
    private alertService: AlertService
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
            this.alertService.success('Please check your inbox for reset link');
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
