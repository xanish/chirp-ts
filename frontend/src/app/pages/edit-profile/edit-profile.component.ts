import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft, faFeather } from '@fortawesome/free-solid-svg-icons';
import { AlertService } from 'src/app/modules/core/services/alert.service';
import { UserService } from 'src/app/modules/core/services/user.service';
import { User } from 'src/app/modules/shared/models/user.model';
import { TUser } from 'src/app/modules/shared/types/user.type';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  faFeather = faFeather;
  faArrowLeft = faArrowLeft;
  disableSubmit = false;
  user: User = User.default();
  form = this.formBuilder.group({
    firstName: [
      this.user.firstName,
      [Validators.required, Validators.minLength(2), Validators.maxLength(64)],
    ],
    lastName: [
      this.user.lastName,
      [Validators.minLength(2), Validators.maxLength(64)],
    ],
    email: [
      this.user.email,
      [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(64),
      ],
    ],
    username: [
      this.user.username,
      [Validators.required, Validators.minLength(2), Validators.maxLength(64)],
    ],
    city: [this.user.city],
    country: [this.user.country],
    birthDate: [this.datePipe.transform(this.user.birthDate, 'yyyy-MM-dd')],
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
    this.form.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      username: this.user.username,
      email: this.user.email,
      city: this.user.city,
      country: this.user.country,
      birthDate: this.datePipe.transform(this.user.birthDate, 'yyyy-MM-dd'),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.disableSubmit = true;
      this.userService
        .update({
          firstName: this.form.value.firstName ?? undefined,
          lastName: this.form.value.lastName ?? undefined,
          username: this.form.value.username ?? undefined,
          email: this.form.value.email ?? undefined,
          city: this.form.value.city ?? undefined,
          country: this.form.value.country ?? undefined,
          birthDate: this.form.value.birthDate
            ? this.datePipe.transform(
                this.form.value.birthDate,
                'yyyy-MM-dd'
              ) ?? undefined
            : undefined,
        })
        .subscribe({
          next: (response: TUser) => {
            this.alertService.success('Updated profile details');
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
