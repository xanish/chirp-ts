import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperclip, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AlertService } from 'src/app/modules/core/services/alert.service';
import { TokenService } from 'src/app/modules/core/services/token.service';
import { TweetService } from 'src/app/modules/core/services/tweet.service';
import { AttachmentType } from '../../enums/attachment-type.enum';
import { TweetType } from '../../enums/tweet-type.enum';
import { TTweet } from '../../types/tweet.type';
import { UploadAttachmentResponse } from '../../types/upload-attachment-response.type';
import { ValidationMessageComponent } from '../validation-message/validation-message.component';

@Component({
  selector: 'app-tweet-modal',
  templateUrl: './tweet-modal.component.html',
  styleUrls: ['./tweet-modal.component.css'],
  standalone: true,
  imports: [
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    ValidationMessageComponent,
    NgIf,
    NgClass,
    NgFor,
  ],
})
export class TweetModalComponent {
  @Input() type: TweetType = TweetType.TWEET;
  @Input() relatedId: string | null = null;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @ViewChild('attachments') attachments: any;

  tweetType = TweetType;
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
    private tokenService: TokenService,
    private tweetService: TweetService,
    private alertService: AlertService
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
      if (this.medias.length > 0) {
        const medias = this.medias.map((media) => media.file);
        this.tweetService.upload(medias).subscribe({
          next: (response: UploadAttachmentResponse) => {
            this.tweetService
              .create({
                type: this.type,
                content: this.form.value.content ?? undefined,
                attachments: response.uploadedFiles,
                userId: this.tokenService.id(),
                relatedId: this.relatedId ?? undefined,
              })
              .subscribe({
                next: (response: TTweet) => {
                  this.disableSubmit = false;
                  this.form.reset();
                  this.close.emit();
                },
                error: (e) => {
                  this.alertService.error(e, 'Failed to create tweet');
                  this.disableSubmit = false;
                },
              });
          },
          error: (e) => {
            this.alertService.error(e, 'Failed to upload tweet media');
            this.disableSubmit = false;
          },
        });
      } else {
        this.tweetService
          .create({
            type: this.type,
            content: this.form.value.content ?? undefined,
            userId: this.tokenService.id(),
            relatedId: this.relatedId ?? undefined,
          })
          .subscribe({
            next: (response: TTweet) => {
              this.disableSubmit = false;
              this.form.reset();
              this.close.emit();
            },
            error: (e) => {
              this.alertService.error(e, 'Failed to create tweet');
              this.disableSubmit = false;
            },
          });
      }
    }
  }
}
