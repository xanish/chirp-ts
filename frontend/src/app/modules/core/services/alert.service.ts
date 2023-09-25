import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ValidationError } from '../../shared/errors/validation.error';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private toastrService: ToastrService) {}

  success(message: string, title: string = 'Success') {
    this.toastrService.success(message, title);
  }

  error(e: any, title: string = 'Error') {
    if (e instanceof ValidationError) {
      let messages: Array<string> = [];
      for (let key in e.errors) {
        messages = messages.concat(e.errors[key].messages);
      }
      this.toastrService.error(messages[0], e.message);
    } else {
      this.toastrService.error(e.message, title);
    }
  }
}
