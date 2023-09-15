import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
})
export class VerifyComponent {
  submitting: boolean = false;
  form = this.formBuilder.group({});

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  onSubmit() {
    if (this.form.valid) {
      this.submitting = true;
      const token = this.route.snapshot.paramMap.get('token') ?? '';
      this.authService.verify(token).subscribe({
        next: (response: any) => {
          this.form.reset();
          this.router.navigate(['/auth/login']);
        },
        error: (e) => console.error(e),
        complete: () => {
          this.submitting = false;
        },
      });
    }
  }
}
