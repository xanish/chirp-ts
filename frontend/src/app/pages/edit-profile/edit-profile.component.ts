import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/modules/shared/models/user.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent {
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
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
    console.log(this.user.birthDate);
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

  onSubmit() {}
}
