import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/auth';
import { IUser } from '@shared/interface';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nhs-web-ui';
  currentUser: IUser | undefined
  items: MenuItem[];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.items = [  
      {
        label: 'Home',
      }
    ];
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  get isAuthenticated(): boolean {
    const user = this.authenticationService.currentUserValue
    if (user && Object.keys(user).length > 0) {
      return true
    }
    return false
  }
}
