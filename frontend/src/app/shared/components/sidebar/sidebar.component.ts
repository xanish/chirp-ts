import { Component } from '@angular/core';
import { TokenService } from 'src/app/core/token.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  user: User = this.tokenService.user();

  constructor(private tokenService: TokenService) {}
}
