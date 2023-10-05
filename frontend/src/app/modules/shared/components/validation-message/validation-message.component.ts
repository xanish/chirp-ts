import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { startWith } from 'rxjs';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css'],
  standalone: true,
  imports: [NgIf],
})
export class ValidationMessageComponent implements OnInit {
  @Input() fieldName: string = 'Field';
  @Input() control!: AbstractControl;
  @Input() messages: any = {};

  public message: string = '';

  private fallbackMessages: any = {
    email: 'The :field must be a valid email.',
    maxlength:
      'The :field field must not be greater than :requiredLength characters.',
    minlength:
      'The :field field must not be less than :requiredLength characters.',
    required: 'The :field field is required.',
  };

  ngOnInit() {
    // setup a change listener on the control element to change error message
    // make sure to set its default value as the current status to prevent
    // default initialization errors
    this.control?.statusChanges
      .pipe(startWith(this.control.status))
      .subscribe((_) => this.setErrorMessage());
  }

  setErrorMessage() {
    if (this.control?.errors) {
      const keys = Object.keys(this.control.errors);

      if (keys.length) {
        this.message = this.formatMessage(
          this.getErrorMessage(keys[0]),
          keys[0]
        );
      }
    } else {
      this.message = '';
    }
  }

  getErrorMessage(key: string): string {
    let message = null;

    // use the user provided message if it has been provided
    // otherwise use from the set of fallback messages
    if (this.messages[key]) {
      message = this.messages[key];
    } else if (
      this.fallbackMessages.hasOwnProperty(key) &&
      this.fallbackMessages[key] != null
    ) {
      message = this.fallbackMessages[key].replace(':field', this.fieldName);
    }

    return message;
  }

  formatMessage(message: string, key: string): string {
    let match = null;

    do {
      // replace all strings that start with ':' with the respective
      // value from this.control.errors
      // this basically changes things like :requiredLength to the actual
      // value which is returned by angular validator
      match = /:[a-z]+/i.exec(message);
      if (match && this.control?.errors) {
        message = message.replace(
          match[0],
          this.control?.errors[key][match[0].substring(1)]
        );
      }
    } while (match);

    return message;
  }
}
