import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { TweetService } from 'src/app/modules/core/services/tweet.service';

@Component({
  selector: 'app-tweet-modal',
  templateUrl: './tweet-modal.component.html',
  styleUrls: ['./tweet-modal.component.css'],
})
export class TweetModalComponent {
  @Output() close: EventEmitter<any> = new EventEmitter();

  form = this.formBuilder.group({
    content: ['', [Validators.required]],
  });
  disableSubmit = false;
  faXmark = faXmark;

  constructor(
    private formBuilder: FormBuilder,
    private tweetService: TweetService
  ) {}

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    if (this.form.valid) {
      this.disableSubmit = true;
      // this.tweetService.create();
    }
  }
}
