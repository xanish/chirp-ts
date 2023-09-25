import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faPaperclip, faXmark } from '@fortawesome/free-solid-svg-icons';
import { TweetService } from 'src/app/modules/core/services/tweet.service';
import { AttachmentType } from '../../enums/attachment-type.enum';

@Component({
  selector: 'app-tweet-modal',
  templateUrl: './tweet-modal.component.html',
  styleUrls: ['./tweet-modal.component.css'],
})
export class TweetModalComponent {
  @Output() close: EventEmitter<any> = new EventEmitter();
  @ViewChild('attachments') attachments: any;

  medias: Array<any> = [];
  attachmentType = AttachmentType;
  form = this.formBuilder.group({
    content: ['', [Validators.required]],
  });
  disableSubmit = false;
  faXmark = faXmark;
  faPaperclip = faPaperclip;

  constructor(
    private formBuilder: FormBuilder,
    private tweetService: TweetService
  ) {}

  closeModal() {
    this.close.emit();
  }

  attachmentAdded($event: any) {
    if ($event.target && $event.target.files.length > 0) {
      for (let file of $event.target.files) {
        let reader = new FileReader();
        const type =
          file.type.indexOf('video') > -1
            ? AttachmentType.VIDEO
            : AttachmentType.IMAGE;
        reader.onload = (e: any) => {
          this.medias.push({
            name: file.name,
            type: type,
            content: e.target.result,
            file: file,
          });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  gridClasses(attachmentCount: number): string {
    switch (attachmentCount) {
      case 4:
      case 3:
        return 'grid-cols-2 grid-rows-2';
      case 2:
        return 'grid-cols-2 grid-rows-1';
      default:
        return 'grid-cols-1 grid-rows-1';
    }
  }

  removeMedia(name: string) {
    this.medias = this.medias.filter((media) => media.name !== name);
  }

  onSubmit() {
    if (this.form.valid) {
      this.disableSubmit = true;
      // this.tweetService.create();
    }
  }
}
