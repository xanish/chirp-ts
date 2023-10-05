import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFeather } from '@fortawesome/free-solid-svg-icons';
import { AlertService } from 'src/app/modules/core/services/alert.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, ReactiveFormsModule, NgIf],
})
export class VerifyComponent {
  faFeather = faFeather;
  submitting: boolean = false;
  form = this.formBuilder.group({});

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  onSubmit() {
    if (this.form.valid) {
      this.submitting = true;
      const token = this.route.snapshot.paramMap.get('token') ?? '';
      this.authService.verify(token).subscribe({
        next: (response: any) => {
          this.form.reset();
          this.router.navigate(['/auth/login']);
          this.alertService.success('Your account has been verified');
          this.submitting = false;
        },
        error: (e) => {
          this.alertService.error(e);
          this.submitting = false;
        },
      });
    }
  }
}
