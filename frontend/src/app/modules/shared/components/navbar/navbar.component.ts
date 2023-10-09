import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFeather } from '@fortawesome/free-solid-svg-icons';
import { NgClickOutsideDirective } from 'ng-click-outside2';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { AlertService } from 'src/app/modules/core/services/alert.service';
import { UserService } from 'src/app/modules/core/services/user.service';
import { User } from '../../models/user.model';
import { TPaginationResponse } from '../../types/paginated-response.type';
import { TUser } from '../../types/user.type';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [
    FontAwesomeModule,
    NgIf,
    NgFor,
    RouterLink,
    NgClickOutsideDirective,
  ],
})
export class NavbarComponent implements OnInit {
  faFeather = faFeather;
  searchedUsers: Array<User> = [];
  showSearchResults = false;
  search: Subject<string> = new Subject();

  constructor(
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.search
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((term) => {
        this.userService
          .findMany({
            term: term,
            limit: 10,
          })
          .subscribe({
            next: (response: TPaginationResponse<TUser>) => {
              this.showSearchResults = true;
              this.searchedUsers = response.records.map(
                (user) => new User(user)
              );
            },
            error: (e) => {
              this.alertService.error(e);
            },
          });
      });
  }

  handleSearch(event: any) {
    this.search.next(event.target.value ?? '');
  }

  displaySearchResults() {
    this.showSearchResults = true;
  }

  hideSearchResults() {
    this.showSearchResults = false;
  }
}
